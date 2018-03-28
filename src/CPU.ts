import { Registers, Register } from "./Registers";
import Memory from "./Memory";
import Utils from "./Utils";
import { Instructions } from "./Instructions";



export default class CPU
{
	private memory:Memory;
	private registers:Registers;
	
	private proccesor:Map<number, () => void>;
	private stop:boolean = false;

	constructor(memory:Memory)
	{
		this.registers = new Registers();
		this.memory = memory;

		this.proccesor = new Map([
			[ 0x20, this.JRNZn.bind(this) ],
			
			[ 0x0E, this.LD.bind(this, Register.C) ],
			[ 0x1E, this.LD.bind(this, Register.E) ],
			[ 0x2E, this.LD.bind(this, Register.L) ],
			[ 0x3E, this.LD.bind(this, Register.A) ],

			[ 0x06, this.LD.bind(this, Register.B) ],
			[ 0x16, this.LD.bind(this, Register.D) ],
			[ 0x26, this.LD.bind(this, Register.H) ],

			[ 0x11, this.LDWord.bind(this, Register.DE) ],
			[ 0x21, this.LDWord.bind(this, Register.HL) ],
			[ 0x31, this.LDWord.bind(this, Register.SP) ],
			[ 0x32, this.LDHLDA.bind(this) ],
			[ 0xAF, this.XOR.bind(this, Register.A) ],
			[ 0xCB, this.BIT7H.bind(this) ],
			[ 0xE2, () => { memory.writeByte(0xFF00 | this.registers.C, this.registers.A); } ],
			[ 0xE0, () => { memory.writeByte(0xff00 | this.registers.PC, this.registers.A); } ],
			[ 0x77, () => { memory.writeByte(this.registers.HL, this.registers.A) } ],
			
			[ 0x0C, this.INC.bind(this, Register.C) ],
			[ 0x1A, () => { this.registers.A = this.memory.readByte(this.registers.DE) } ],

			[ 0xCD, this.CALL.bind(this) ],

			[ 0x4F, () => this.registers.C = this.registers.A ],

			[ 0xC5, () => this.PUSH_STACK(this.registers.BC) ],

			[ 0x17, this.RLA.bind(this) ],

			[ 0xC1, () => { this.registers.BC = this.POP_STACK() } ],

			[ 0x05, this.DEC.bind(this, Register.B) ],
			[ 0x3D, this.DEC.bind(this, Register.A) ],
			[ 0x22, () => { this.memory.writeByte(this.registers.HL++, this.registers.A); } ],
			[ 0x23, () => this.registers.HL++ ],
			[ 0xC9, () => this.registers.PC = this.POP_STACK() ]
		]);

		while(!this.stop)
		{
			this.cycle();

			if(this.registers.broke()) {
				this.stop = true;
			}
		}
	}

	RLA()
	{
		var carry = this.registers.flags.carry ? 1 : 0;
		this.registers.flags.carry = this.registers.A > 0x7f;
		this.registers.A = ((this.registers.A << 1) & 0xff) | carry;
		this.registers.flags.zero = false;
		this.registers.flags.addsub = false;
		this.registers.flags.half = false;
	}

	RL(value:number)
	{
		var newCf = value > 0x7f;
		value = ((value << 1) & 0xff) | (this.registers.flags.carry ? 1 : 0);
		this.registers.flags.carry = newCf;
		this.registers.flags.half = this.registers.flags.addsub = false;
		this.registers.flags.zero = value == 0;
		
		return value & 0xff;
	}

	CALL()
	{
		var newSP = this.memory.readWord(this.registers.PC);

		this.PUSH_STACK(this.registers.PC);
		
		this.registers.PC = newSP + 1; // wat

		console.log("CALL FUNCTION @ " + Utils.toHex(this.registers.PC) + " " + (Utils.toHex(this.registers.PC - 1)));
	}
	
	PUSH_STACK(value:number)
	{
		this.memory.writeByte((--this.registers.SP) & 0xffff, value >> 8);
		this.memory.writeByte((--this.registers.SP) & 0xffff, value & 0xff);

		this.registers.SP &= 0xffff;
	}
	
	POP_STACK()
	{
		// READ WORD?
		return (this.memory.readByte(this.registers.SP++) | (this.memory.readByte(this.registers.SP++) << 8)) & 0xffff;
	}

	LD_MEMORY(registerA:Register, registerB:Register)
	{
		this.registers.set(registerA, this.memory.readByte(this.registers.get(registerB)));
	}

	cycle()
	{
		// console.log("-------------------");
		var addres = this.registers.PC;

		if(addres == 0x39)
		{
			this.stop = true;
			console.log("Break " + Utils.toHex(this.registers.HL) + " vs " + Utils.toHex(this.registers.get(Register.HL)));
			console.log(this.registers.toStringBGB());
			return;
		}


		var opcode = this.memory.readByte(addres);
		var da = Instructions.ALL[opcode];
		
		var instruction = this.proccesor.get(opcode);

		

		// console.log("@" + Utils.toHex(this.registers.PC) + " " + Utils.toHex(opcode) + " - " + da.tag);

		this.registers.PC++;

		if(instruction)
		{
			instruction();

			this.registers.PC += da.size - 1;
			this.registers.PC &= 0xFFFF;
		}
		else
		{
			this.stop = true;
			console.error("Opcode instruction not found! " + da.tag + " (" + Utils.toHex(opcode) + ") @ " + Utils.toHex(this.registers.PC - 1));
			console.log(this.registers.toString());
		}
	}

	DEC(register:Register)
	{
		var val = this.registers.get(register);

		val = (val - 1) & 0xff;

		this.registers.flags.zero = val == 0;
		this.registers.flags.half = (val & 0xf) == 0xf;
		this.registers.flags.addsub = true;

		this.registers.set(register, val & 0xff);
	}

	LDWord(register:Register)
	{
		this.registers.set(register, this.memory.readWord(this.registers.PC));

		console.log("LD " + Register[register] + " = " + Utils.toHex(this.registers.get(register)));
	}

	LD(register:Register)
	{
		console.log("LD: " + Register[register]);
		console.log(this.registers.get(register));
		this.registers.set(register, this.memory.readByte(this.registers.PC));
		console.log(Utils.toHex(this.registers.get(register)));
		
	}

	XOR(register:Register)
	{
		var regi = this.registers.get(register);

		regi ^= regi;
		regi &= regi;

		this.registers.F = regi;
		this.registers.F = this.registers.F == 1 ? 0 : 0x80;

		console.log(this.registers.get(register) + " VS " + regi);
		
	}

	LDHLDA()
	{
		this.memory.writeByte((this.registers.H << 8) + this.registers.L, this.registers.A);
		// console.log("LD " + Utils.toHex(this.registers.get(register)) + " -> " + Register[register]);

		this.registers.L = this.registers.L - 1 & 255;

		if(this.registers.L == 255) this.registers.H = (this.registers.H - 1) & 255;
	}
	
	BIT7H()
	{
		var i = this.memory.readByte(this.registers.PC);

		if(i == 0x7C) // 0x4f: // BIT 1,A
		{
			// this.registers.flags.half
			this.registers.flags.half = true;
			this.registers.flags.addsub = false;
			this.registers.flags.zero = !((this.registers.H & (1 << 7)) != 0);
		}
	}
	
	JRNZn()
	{

		if(!this.registers.flags.zero)
		{
			var jump = (this.memory.readByte(this.registers.PC) ^ 0x80) - 0x80;
			this.registers.PC += jump;
			// console.log("Jump " + Utils.toHex(this.registers.PC) + " - " + this.registers.B);
		}
		else
		{
			// this.stop = true;
			console.log("break");
			// console.log(this.memory.print(0x7000, 0xAFFF));
		}
	}

	INC(register:Register)
	{
		var value = this.registers.get(register);
		// this.registers.set(register,  + 1);
		value = (value + 1) & 0xff;
		this.registers.flags.zero = (value == 0);
		this.registers.flags.half = (value & 0xf) == 0;
		this.registers.flags.addsub = false;
		
		this.registers.set(register, value & 0xff);
	}

}