import Memory from "./Memory";
import BIOS from "./BIOS";
import CPU from "./CPU";

console.log("TypeBoy");

var cpu = new CPU(new Memory(0xFFFF, BIOS.DMG));