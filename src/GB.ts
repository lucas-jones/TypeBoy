import { readFileSync } from "fs";

import Memory from "./Memory";
import BIOS from "./BIOS";
import CPU from "./CPU";

console.log("TypeBoy");

var memory = new Memory(0xFFFF, BIOS.DMG);
memory.writebytes(readFileSync("./test.gb"), 0xFF);

console.log(memory.print(0x0000, 0x01FF));

var cpu = new CPU(memory);