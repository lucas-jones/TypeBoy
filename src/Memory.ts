import Utils from "./Utils";

export default class Memory
{
    private data:Int16Array;

    constructor(size:number = 0xFFFF, defaultData?:Int16Array)
    {
        this.data = new Int16Array(size);

        // Set data to default of 0xFF
        this.data.fill(0xFF);

        if(defaultData) this.data.set(defaultData);
    }

    public writeByte(address:number, value:number)
	{
        this.data[address] = value;
        // console.log("WRITE " + Utils.toHex(address) + " = " + Utils.toHex(value));
    }

    public writebytes(data:ArrayLike<number>, offset?:number)
    {
        this.data.set(data, offset);
    }

    public readByte(address:number)
    {
        return this.data[address];
    }

    public readWord(address:number)
	{
		return (this.data[address + 1] << 8) | this.data[address];
	}

    public print(start:number = 0, end:number = 256)
    {
        return Utils.toHexDump(this.data.slice(start, end));
    }
}