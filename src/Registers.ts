import Utils from "./Utils";

export enum Register
{
    SP,
    PC,
    HL,
    DE,
    A,
    B,
    C,
    D,
    E,
    F,
    H,
    L,
}

export class Flags
{
    public carry:boolean;
    public half:boolean;
    public zero:boolean;
    public addsub:boolean;

    constructor()
    {
        this.carry = true;
        this.half = true;
        this.zero = true;
        this.addsub = false;
    }
}

export class Registers
{
    public flags:Flags;

    private registers:Map<Register, number>;

    get SP() { return this.registers.get(Register.SP); }
    set SP(value:number) { this.registers.set(Register.SP, value); }

    get PC() { return this.registers.get(Register.PC); }
    set PC(value:number) { this.registers.set(Register.PC, value); }

    get A() { return this.registers.get(Register.A); }
    set A(value:number) { this.registers.set(Register.A, value); }

    get B() { return this.registers.get(Register.B); }
    set B(value:number) { this.registers.set(Register.B, value); }

    get C() { return this.registers.get(Register.C); }
    set C(value:number) { this.registers.set(Register.C, value); }

    get D() { return this.registers.get(Register.D); }
    set D(value:number) { this.registers.set(Register.D, value); }

    get E() { return this.registers.get(Register.E); }
    set E(value:number) { this.registers.set(Register.E, value); }

    get F() { return this.registers.get(Register.F); }
    set F(value:number) { this.registers.set(Register.F, value); }

    get H() { return this.registers.get(Register.H); }
    set H(value:number) { this.registers.set(Register.H, value); }

    get L() { return this.registers.get(Register.L); }
    set L(value:number) { this.registers.set(Register.L, value); }

    get HL() { return (this.H << 8) | this.L; }
    set HL(value:number)
    {
        this.H = (value & 0xff00) >> 8;
        this.L = value & 0xff;
    }

    get DE() { return (this.D << 8) | this.E; }
    set DE(value:number)
    {
        this.D = (value & 0xff00) >> 8;
        this.E = value & 0xff;
    }

    constructor()
    {
        this.flags = new Flags();
        this.registers = new Map();

        this.SP = 0;
        this.PC = 0;
        this.HL = 0;

        this.A = 0;
        this.B = 0;
        this.C = 0;
        this.D = 0;
        this.E = 0;
        this.F = 0;
    }

    set(register:Register, value:number)
    {
        this.registers.set(register, value);
    }

    get(register:Register)
    {
        return this.registers.get(register);
    }
    
    toString()
    {
        return [
            `PC: ${Utils.toHexCompact(this.PC)}\tSP: ${Utils.toHexCompact(this.SP)}`,
            `HL: ${Utils.toHexCompact(this.HL)}`,
            `A: ${Utils.toHexCompact(this.A)} B: ${Utils.toHexCompact(this.B)}`,
            `C: ${Utils.toHexCompact(this.C)} D: ${Utils.toHexCompact(this.D)}`,
            `E: ${Utils.toHexCompact(this.E)} F: ${Utils.toHexCompact(this.F)}`,
        ].join(`\n`);
    }
}