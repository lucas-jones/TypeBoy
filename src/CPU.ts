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

            
            [ 0x21, this.LDWord.bind(this, Register.HL) ],
            [ 0x31, this.LDWord.bind(this, Register.SP) ],
            [ 0x32, this.LDHLDA.bind(this) ],
            [ 0xAF, this.XOR.bind(this, Register.A) ],
            [ 0xCB, this.BIT7H.bind(this) ],
            [ 0xE2, () => { memory.writeByte(0xFF00 | this.registers.C, this.registers.A); } ],
            [ 0x0C, this.INC.bind(this, Register.C) ],
            [ 0x77, () => { memory.writeByte(this.registers.HL, this.registers.A) } ],
            [ 0xE0, () => { memory.writeByte(0xff00 | this.registers.PC, this.registers.A); } ],
            [ 0x11, () => { memory.writeByte(this.registers.HL, this.registers.A); } ],
            [ 0x1A, this.LD_MEMORY.bind(this, Register.A, Register.DE) ],
            // [ 0xCD, =]
        ]);

        while(!this.stop)
        {
            this.cycle();
        }
    }

    LD_MEMORY(registerA:Register, registerB:Register)
	{
        this.registers.set(registerA, this.memory.readByte(this.registers.get(registerB)));
    }

    cycle()
    {
        // console.log("-------------------");

        var opcode = this.memory.readByte(this.registers.PC++);
        var da = Instructions.ALL[opcode];
        // console.log("@" + Utils.toHex(this.registers.PC - 1) + " " + Utils.toHex(opcode) + " - " + da.tag);
        var instruction = this.proccesor.get(opcode);

        if(instruction)
        {
            instruction();

            this.registers.PC += da.size - 1;
            this.registers.PC &= 0xFFFF;
        }
        else
        {
            // this.stop = true;
            console.error("Opcode instruction not found! " + da.tag + " (" + Utils.toHex(opcode) + ") @ " + Utils.toHex(this.registers.PC - 1));
            console.log(this.registers.toString());
        }
    }

    LDWord(register:Register)
	{
        this.registers.set(register, this.memory.readWord(this.registers.PC));

        // console.log("LD " + Utils.toHex(this.registers.get(register)) + " -> " + Register[register]);
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
            this.registers.flags.half
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
        var value = (this.registers.get(register) + 1) & 0xff;
        this.registers.set(register, value & 0xff);
	}

}