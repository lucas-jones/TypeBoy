export class Instructions
{
    static ALL:{ [key: number]: { size:number, cycles:number, tag:string } }=
    {
        [0x00]: { size: 1, cycles: 1, tag: "NOP"},
        [0x01]: { size: 3, cycles: 3, tag: "LD BC, nn"},
        [0x02]: { size: 1, cycles: 2, tag: "LD (BC), A"},
        [0x03]: { size: 1, cycles: 2, tag: "INC BC"},
        [0x04]: { size: 1, cycles: 1, tag: "INC B"},
        [0x05]: { size: 1, cycles: 1, tag: "DEC B"},
        [0x06]: { size: 2, cycles: 2, tag: "LD B, n"},
        [0x07]: { size: 1, cycles: 1, tag: "RLCA"},
        [0x08]: { size: 3, cycles: 5, tag: "LD (nn), SP"},
        [0x09]: { size: 1, cycles: 2, tag: "ADD HL, BC"},
        [0x0A]: { size: 1, cycles: 2, tag: "LD A, (BC)"},
        [0x0B]: { size: 1, cycles: 2, tag: "DEC BC"},
        [0x0C]: { size: 1, cycles: 1, tag: "INC C"},
        [0x0D]: { size: 1, cycles: 1, tag: "DEC C"},
        [0x0E]: { size: 2, cycles: 2, tag: "LD C, n"},
        [0x0F]: { size: 1, cycles: 1, tag: "RRCA"},
        [0x10]: { size: 1, cycles: 2, tag: "STOP"},
        [0x11]: { size: 3, cycles: 3, tag: "LD DE, nn"},
        [0x12]: { size: 1, cycles: 2, tag: "LD (DE), A"},
        [0x13]: { size: 1, cycles: 2, tag: "INC DE"},
        [0x14]: { size: 1, cycles: 1, tag: "INC D"},
        [0x15]: { size: 1, cycles: 1, tag: "DEC D"},
        [0x16]: { size: 2, cycles: 2, tag: "LD D, n"},
        [0x17]: { size: 1, cycles: 1, tag: "RLA"},
        [0x18]: { size: 0, cycles: 3, tag: "JR, $+e"},
        [0x19]: { size: 1, cycles: 2, tag: "ADD HL, DE"},
        [0x1A]: { size: 1, cycles: 2, tag: "LD A, (DE)"},
        [0x1B]: { size: 1, cycles: 2, tag: "DEC DE"},
        [0x1C]: { size: 1, cycles: 1, tag: "INC E"},
        [0x1D]: { size: 1, cycles: 1, tag: "DEC E"},
        [0x1E]: { size: 2, cycles: 2, tag: "LD E, n"},
        [0x1F]: { size: 1, cycles: 1, tag: "RRA"},
        [0x20]: { size: 2, cycles: 0, tag: "JR NZ, nn"}, // <-- Mi}e
        [0x21]: { size: 3, cycles: 3, tag: "LD HL, nn"},
        [0x22]: { size: 1, cycles: 2, tag: "LD (HLI), A"},
        [0x23]: { size: 1, cycles: 2, tag: "INC HL"},
        [0x24]: { size: 1, cycles: 1, tag: "INC H"},
        [0x25]: { size: 1, cycles: 1, tag: "DEC H"},
        [0x26]: { size: 2, cycles: 2, tag: "LD H, n"},
        [0x27]: { size: 1, cycles: 1, tag: "DAA"},
        [0x28]: { size: 0, cycles: 0, tag: "JR Z, $ + e"},
        [0x29]: { size: 1, cycles: 2, tag: "ADD HL, HL"},
        [0x2A]: { size: 1, cycles: 2, tag: "LD A, (HLI)"},
        [0x2B]: { size: 1, cycles: 2, tag: "DEC HL"},
        [0x2C]: { size: 1, cycles: 1, tag: "INC L"},
        [0x2D]: { size: 1, cycles: 1, tag: "DEC L"},
        [0x2E]: { size: 2, cycles: 2, tag: "LD L, n"},
        [0x2F]: { size: 1, cycles: 1, tag: "CPL"},
        [0x30]: { size: 0, cycles: 0, tag: "JR NC, $+e"},
        [0x31]: { size: 3, cycles: 3, tag: "LD SP, nn"},
        [0x32]: { size: 1, cycles: 2, tag: "LD (HLD), A"},
        [0x33]: { size: 1, cycles: 2, tag: "INC SP"},
        [0x34]: { size: 1, cycles: 3, tag: "INC (HL)"},
        [0x35]: { size: 1, cycles: 3, tag: "DEC (HL)"},
        [0x36]: { size: 2, cycles: 3, tag: "LD (HL), n"},
        [0x37]: { size: 1, cycles: 1, tag: "SCF"},
        [0x38]: { size: 0, cycles: 0, tag: "JR, C, $+e"},
        [0x39]: { size: 1, cycles: 2, tag: "ADD HL, SP"},
        [0x3A]: { size: 1, cycles: 2, tag: "LD A, (HL-)"},
        [0x3B]: { size: 1, cycles: 2, tag: "DEC SP"},
        [0x3C]: { size: 1, cycles: 1, tag: "INC A"},
        [0x3D]: { size: 1, cycles: 1, tag: "DEC A"},
        [0x3E]: { size: 2, cycles: 2, tag: "LD A, n"},
        [0x3F]: { size: 1, cycles: 1, tag: "CCF"},
        [0x40]: { size: 1, cycles: 1, tag: "LD B, B"},
        [0x41]: { size: 1, cycles: 1, tag: "LD B, C"},
        [0x42]: { size: 1, cycles: 1, tag: "LD B, D"},
        [0x43]: { size: 1, cycles: 1, tag: "LD B, E"},
        [0x44]: { size: 1, cycles: 1, tag: "LD B, H"},
        [0x45]: { size: 1, cycles: 1, tag: "LD B, L"},
        [0x46]: { size: 1, cycles: 2, tag: "LD B, (HL)"},
        [0x47]: { size: 1, cycles: 1, tag: "LD B, A"},
        [0x48]: { size: 1, cycles: 1, tag: "LD C, B"},
        [0x49]: { size: 1, cycles: 1, tag: "LD C, C"},
        [0x4A]: { size: 1, cycles: 1, tag: "LD C, D"},
        [0x4B]: { size: 1, cycles: 1, tag: "LD C, E"},
        [0x4C]: { size: 1, cycles: 1, tag: "LD C, H"},
        [0x4D]: { size: 1, cycles: 1, tag: "LD C, L"},
        [0x4E]: { size: 1, cycles: 2, tag: "LD C, (HL)"},
        [0x4F]: { size: 1, cycles: 1, tag: "LD C, A"},
        [0x50]: { size: 1, cycles: 1, tag: "LD D, B"},
        [0x51]: { size: 1, cycles: 1, tag: "LD D, C"},
        [0x52]: { size: 1, cycles: 1, tag: "LD D, D"},
        [0x53]: { size: 1, cycles: 1, tag: "LD D, E"},
        [0x54]: { size: 1, cycles: 1, tag: "LD D, H"},
        [0x55]: { size: 1, cycles: 1, tag: "LD D, L"},
        [0x56]: { size: 1, cycles: 2, tag: "LD D, (HL)"},
        [0x58]: { size: 1, cycles: 1, tag: "LD E, B"},
        [0x59]: { size: 1, cycles: 1, tag: "LD E, C"},
        [0x5A]: { size: 1, cycles: 1, tag: "LD E, D"},
        [0x5B]: { size: 1, cycles: 1, tag: "LD E, E"},
        [0x5C]: { size: 1, cycles: 1, tag: "LD E, H"},
        [0x5D]: { size: 1, cycles: 1, tag: "LD E, L"},
        [0x5E]: { size: 1, cycles: 2, tag: "LD E, (HL)"},
        [0x5F]: { size: 1, cycles: 1, tag: "LD E, A"},
        [0x57]: { size: 1, cycles: 1, tag: "LD D, A"},
        [0x60]: { size: 1, cycles: 1, tag: "LD H, B"},
        [0x61]: { size: 1, cycles: 1, tag: "LD H, C"},
        [0x62]: { size: 1, cycles: 1, tag: "LD H, D"},
        [0x63]: { size: 1, cycles: 1, tag: "LD H, E"},
        [0x64]: { size: 1, cycles: 1, tag: "LD H, H"},
        [0x65]: { size: 1, cycles: 1, tag: "LD H, L"},
        [0x66]: { size: 1, cycles: 2, tag: "LD H, (HL)"},
        [0x67]: { size: 1, cycles: 1, tag: "LD H, A"},
        [0x68]: { size: 1, cycles: 1, tag: "LD L, B"},
        [0x69]: { size: 1, cycles: 1, tag: "LD L, C"},
        [0x6A]: { size: 1, cycles: 1, tag: "LD L, D"},
        [0x6B]: { size: 1, cycles: 1, tag: "LD L, E"},
        [0x6C]: { size: 1, cycles: 1, tag: "LD L, H"},
        [0x6D]: { size: 1, cycles: 1, tag: "LD L, L"},
        [0x6E]: { size: 1, cycles: 2, tag: "LD L, (HL)"},
        [0x6F]: { size: 1, cycles: 1, tag: "LD L, A"},
        [0x70]: { size: 1, cycles: 2, tag: "LD (HL), B"},
        [0x71]: { size: 1, cycles: 2, tag: "LD (HL), C"},
        [0x72]: { size: 1, cycles: 2, tag: "LD (HL), D"},
        [0x73]: { size: 1, cycles: 2, tag: "LD (HL), E"},
        [0x74]: { size: 1, cycles: 2, tag: "LD (HL), H"},
        [0x75]: { size: 1, cycles: 2, tag: "LD (HL), L"},
        [0x76]: { size: 1, cycles: 1, tag: "HALT"},
        [0x77]: { size: 1, cycles: 2, tag: "LD (HL), A"},
        [0x78]: { size: 1, cycles: 1, tag: "LD A, B"},
        [0x79]: { size: 1, cycles: 1, tag: "LD A, C"},
        [0x7A]: { size: 1, cycles: 1, tag: "LD A, D"},
        [0x7B]: { size: 1, cycles: 1, tag: "LD A, E"},
        [0x7C]: { size: 1, cycles: 1, tag: "LD A, H"},
        [0x7D]: { size: 1, cycles: 1, tag: "LD A, L"},
        [0x7E]: { size: 1, cycles: 2, tag: "LD A, (HL)"},
        [0x7F]: { size: 1, cycles: 1, tag: "LD A, A"},
        [0x80]: { size: 1, cycles: 1, tag: "ADD A, B"},
        [0x81]: { size: 1, cycles: 1, tag: "ADD A, C"},
        [0x82]: { size: 1, cycles: 1, tag: "ADD A, D"},
        [0x83]: { size: 1, cycles: 1, tag: "ADD A, E"},
        [0x84]: { size: 1, cycles: 1, tag: "ADD A, H"},
        [0x85]: { size: 1, cycles: 1, tag: "ADD A, L"},
        [0x86]: { size: 1, cycles: 2, tag: "ADD A, (HL)"},
        [0x87]: { size: 1, cycles: 1, tag: "ADD A, A"},
        [0x88]: { size: 1, cycles: 1, tag: "ADC A, B"},
        [0x89]: { size: 1, cycles: 1, tag: "ADC A, C"},
        [0x8A]: { size: 1, cycles: 1, tag: "ADC A, D"},
        [0x8B]: { size: 1, cycles: 1, tag: "ADC A, E"},
        [0x8C]: { size: 1, cycles: 1, tag: "ADC A, H"},
        [0x8D]: { size: 1, cycles: 1, tag: "ADC A, L"},
        [0x8E]: { size: 1, cycles: 2, tag: "ADC A, (HL)"},
        [0x8F]: { size: 1, cycles: 1, tag: "ADC A, A"},
        [0x90]: { size: 1, cycles: 1, tag: "SUB B"},
        [0x91]: { size: 1, cycles: 1, tag: "SUB C"},
        [0x92]: { size: 1, cycles: 1, tag: "SUB D"},
        [0x93]: { size: 1, cycles: 1, tag: "SUB E"},
        [0x94]: { size: 1, cycles: 1, tag: "SUB H"},
        [0x95]: { size: 1, cycles: 1, tag: "SUB L"},
        [0x96]: { size: 1, cycles: 2, tag: "SUB (HL)"},
        [0x97]: { size: 1, cycles: 1, tag: "SUB A"},
        [0x98]: { size: 1, cycles: 1, tag: "SBC B"},
        [0x99]: { size: 1, cycles: 1, tag: "SBC C"},
        [0x9A]: { size: 1, cycles: 1, tag: "SBC D"},
        [0x9B]: { size: 1, cycles: 1, tag: "SBC E"},
        [0x9C]: { size: 1, cycles: 1, tag: "SBC H"},
        [0x9D]: { size: 1, cycles: 1, tag: "SBC L"},
        [0x9E]: { size: 1, cycles: 2, tag: "SBC (HL)"},
        [0x9F]: { size: 1, cycles: 1, tag: "SBC A"},
        [0xA0]: { size: 1, cycles: 1, tag: "AND B"},
        [0xA1]: { size: 1, cycles: 1, tag: "AND C"},
        [0xA2]: { size: 1, cycles: 1, tag: "AND D"},
        [0xA3]: { size: 1, cycles: 1, tag: "AND E"},
        [0xA4]: { size: 1, cycles: 1, tag: "AND H"},
        [0xA5]: { size: 1, cycles: 1, tag: "AND L"},
        [0xA6]: { size: 1, cycles: 2, tag: "AND (HL)"},
        [0xA7]: { size: 1, cycles: 1, tag: "AND A"},
        [0xA8]: { size: 1, cycles: 1, tag: "XOR B"},
        [0xAA]: { size: 1, cycles: 1, tag: "XOR D"},
        [0xAB]: { size: 1, cycles: 1, tag: "XOR E"},
        [0xAC]: { size: 1, cycles: 1, tag: "XOR H"},
        [0xAD]: { size: 1, cycles: 1, tag: "XOR L"},
        [0xAE]: { size: 1, cycles: 2, tag: "XOR (HL)"},
        [0xAF]: { size: 1, cycles: 1, tag: "XOR A"},
        [0xB0]: { size: 1, cycles: 1, tag: "OR B"},
        [0xB1]: { size: 1, cycles: 1, tag: "OR C"},
        [0xB2]: { size: 1, cycles: 1, tag: "OR D"},
        [0xB3]: { size: 1, cycles: 1, tag: "OR E"},
        [0xB4]: { size: 1, cycles: 1, tag: "OR H"},
        [0xB5]: { size: 1, cycles: 1, tag: "OR L"},
        [0xB6]: { size: 1, cycles: 2, tag: "OR (HL)"},
        [0xB7]: { size: 1, cycles: 1, tag: "OR A"},
        [0xB8]: { size: 1, cycles: 1, tag: "CP B"},
        [0xB9]: { size: 1, cycles: 1, tag: "CP C"},
        [0xBA]: { size: 1, cycles: 1, tag: "CP D"},
        [0xBB]: { size: 1, cycles: 1, tag: "CP E"},
        [0xBC]: { size: 1, cycles: 1, tag: "CP H"},
        [0xBD]: { size: 1, cycles: 1, tag: "CP L"},
        [0xBE]: { size: 1, cycles: 2, tag: "CP (HL)"},
        [0xBF]: { size: 1, cycles: 1, tag: "CP A"},
        [0xC0]: { size: 0, cycles: 0, tag: "RET NZ"},
        [0xC1]: { size: 1, cycles: 3, tag: "POP BC"},
        [0xC2]: { size: 0, cycles: 0, tag: "JP NZ, nn"},
        [0xC3]: { size: 0, cycles: 4, tag: "JP, nn"},
        [0xC4]: { size: 0, cycles: 0, tag: "CALL NZ, nn"},
        [0xC5]: { size: 1, cycles: 4, tag: "PUSH BC"},
        [0xC6]: { size: 2, cycles: 2, tag: "ADD A, n"},
        [0xC7]: { size: 0, cycles: 4, tag: "RST 00H"},
        [0xC8]: { size: 0, cycles: 0, tag: "RET Z"},
        [0xC9]: { size: 0, cycles: 4, tag: "RET"},
        [0xCA]: { size: 0, cycles: 0, tag: "JP Z, nn"},
        [0xCB]: { size: 2, cycles: 0, tag: "BIT 7, H"},
        [0xCC]: { size: 0, cycles: 0, tag: "CALL Z, nn"},
        [0xCD]: { size: 0, cycles: 6, tag: "CALL, nn"},
        [0xCE]: { size: 2, cycles: 2, tag: "ADC n"},
        [0xCF]: { size: 0, cycles: 4, tag: "RST 08H"},
        [0xD0]: { size: 0, cycles: 0, tag: "RET NC"},
        [0xD1]: { size: 1, cycles: 3, tag: "POP DE"},
        [0xD2]: { size: 0, cycles: 0, tag: "JP NC, nn"},
        [0xD4]: { size: 0, cycles: 0, tag: "CALL NC, nn"},
        [0xD5]: { size: 1, cycles: 4, tag: "PUSH DE"},
        [0xD6]: { size: 2, cycles: 2, tag: "SUB n"},
        [0xD7]: { size: 0, cycles: 4, tag: "RST 10H"},
        [0xD8]: { size: 0, cycles: 0, tag: "RET C"},
        [0xD9]: { size: 0, cycles: 4, tag: "RETI"},
        [0xDA]: { size: 0, cycles: 0, tag: "JP C, nn"},
        [0xDC]: { size: 0, cycles: 0, tag: "CALL C, nn"},
        [0xDE]: { size: 2, cycles: 2, tag: "SBC A, n"},
        [0xDF]: { size: 0, cycles: 4, tag: "RST 18H"},
        [0xE0]: { size: 2, cycles: 3, tag: "LD (FFn), A"},
        [0xE1]: { size: 1, cycles: 3, tag: "POP HL"},
        [0xE2]: { size: 1, cycles: 2, tag: "LD (C), A"},
        [0xE5]: { size: 1, cycles: 4, tag: "PUSH HL"},
        [0xE6]: { size: 2, cycles: 2, tag: "AND n"},
        [0xE7]: { size: 0, cycles: 4, tag: "RST 20H"},
        [0xE8]: { size: 2, cycles: 4, tag: "ADD SP, n"},
        [0xE9]: { size: 0, cycles: 1, tag: "JP HL"},
        [0xEA]: { size: 3, cycles: 4, tag: "LD (nn), A"},
        [0xEE]: { size: 2, cycles: 2, tag: "XOR n"},
        [0xEF]: { size: 0, cycles: 4, tag: "RST 28H"},
        [0xF0]: { size: 2, cycles: 3, tag: "LD A, (n)"},
        [0xF1]: { size: 1, cycles: 3, tag: "POP AF"},
        [0xF2]: { size: 1, cycles: 2, tag: "LD A, (C)"},
        [0xF3]: { size: 1, cycles: 1, tag: "DI"},
        [0xF5]: { size: 1, cycles: 4, tag: "PUSH AF"},
        [0xF6]: { size: 2, cycles: 2, tag: "OR n"},
        [0xF7]: { size: 0, cycles: 4, tag: "RST 30H"},
        [0xF8]: { size: 2, cycles: 3, tag: "LD HL, SP+e"},
        [0xF9]: { size: 1, cycles: 2, tag: "LD SP, HL"},
        [0xFA]: { size: 3, cycles: 4, tag: "LD A, (nn)"},
        [0xFB]: { size: 1, cycles: 1, tag: "EI"},
        [0xFE]: { size: 2, cycles: 2, tag: "CP n"},
        [0xFF]: { size: 0, cycles: 4, tag: "RST 38H"},
    };
}