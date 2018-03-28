export default class Utils
{
    public static toHex(value:number)
    {
        return (value < 0x10 ? "0x0" : "0x") + value.toString(16).toUpperCase();
    }

    public static toHexCompact(value:number)
    {
        return (value < 0x10 ? "0" : "") + value.toString(16).toUpperCase();
    }

    public static toHexDump(data:Int16Array)
    {
        var result = "";

        for (let i = 0; i < data.length; i++)
        {
            var byte = data[i];

            if((i % 16) == 0) result += "\n" + Utils.toHex(i) + " | ";
            result += Utils.toHexCompact(byte) + " ";
        }

        return result;
    }
}