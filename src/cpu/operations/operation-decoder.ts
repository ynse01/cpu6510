import { AbsoluteAddressing } from "../addressing/absolute-addressing";
import { AbsoluteIndexedYAddressing } from "../addressing/absolute-indexed-y-addressing";
import { AbsoluteIndexedXAddressing } from "../addressing/absolute-indexed-x-addressing";
import { AccumulatorAddressing } from "../addressing/accumulator-addressing";
import { IAddressing } from "../addressing/i-addressing";
import { ImmediateAddressing } from "../addressing/immediate-addressing";
import { ImplicitAddressing } from "../addressing/implicit-addressing";
import { IndirectIndexedXAddressing } from "../addressing/indirect-indexed-x-addressing";
import { IndirectIndexedYAddressing } from "../addressing/indirect-indexed-y-addressing";
import { RelativeAddressing } from "../addressing/relative-addressing";
import { ZeroPageAddressing } from "../addressing/zero-page-addressing";
import { ZeroPageIndexedXAddressing } from "../addressing/zero-page-indexed-x-addressing";
import { ZeroPageIndexedYAddressing } from "../addressing/zero-page-indexed-y-addressing";
import { Processor } from "../processor"
import { KIL } from "./noop/kil";
import { NOP } from "./noop/nop";
import { ANC } from "./illegal/anc";
import { SLO } from "./illegal/slo";
import { ASL } from "./math/asl";
import { ORA } from "./math/ora";
import { PHP } from "./move/php";
import { BRK } from "./jumps/brk";
import { CLC } from "./flags/clc";
import { BPL } from "./jumps/bpl";
import { OperationHelper } from "./operation-helper";
import { AND } from "./math/and";
import { PLP } from "./move/plp";
import { JSR } from "./jumps/jsr";
import { ROL } from "./math/rol";
import { RLA } from "./illegal/rla";
import { BIT } from "./math/bit";
import { SEC } from "./flags/sec";
import { BMI } from "./jumps/bmi";
import { RTI } from "./jumps/rti";
import { EOR } from "./math/eor";
import { LSR } from "./math/lsr";
import { JMP } from "./jumps/jmp";
import { PHA } from "./move/pha";
import { SRE } from "./illegal/sre";
import { ALR } from "./illegal/alr";
import { CLI } from "./flags/cli";
import { BVC } from "./jumps/bvc";
import { ADC } from "./math/adc";
import { IndirectAddressing } from "../addressing/indirect-addressing";
import { BVS } from "./jumps/bvs";
import { ROR } from "./math/ror";
import { RRA } from "./illegal/rra";
import { RTS } from "./jumps/rts";
import { PLA } from "./move/pla";
import { ARR } from "./illegal/arr";
import { SEI } from "./flags/sei";
import { BCC } from "./jumps/bcc";
import { BCS } from "./jumps/bcs";
import { CLV } from "./flags/clv";
import { BNE } from "./jumps/bne";
import { BEQ } from "./jumps/beq";
import { SBC } from "./math/sbc";
import { CLD } from "./flags/cld";
import { STA } from "./move/sta";
import { STY } from "./move/sty";
import { STX } from "./move/stx";
import { SAX } from "./illegal/sax";
import { TXA } from "./move/txa";
import { TYA } from "./move/tya";
import { TXS } from "./move/txs";
import { TAX } from "./move/tax";
import { TSX } from "./move/tsx";
import { CPY } from "./flags/cpy";
import { CMP } from "./flags/cmp";
import { CPX } from "./flags/cpx";
import { LDY } from "./move/ldy";
import { LDA } from "./move/lda";
import { LDX } from "./move/ldx";
import { TAY } from "./move/tay";
import { DEY } from "./math/dey";
import { DEC } from "./math/dec";
import { INY } from "./math/iny";
import { INC } from "./math/inc";
import { INX } from "./math/inx";
import { SED } from "./flags/sed";
import { ISC } from "./illegal/isc";
import { DEX } from "./math/dex";
import { DCP } from "./illegal/dcp";
import { LAX } from "./illegal/lax";
import { LAS } from "./illegal/las";
import { AXS } from "./illegal/axs";
import { AHX } from "./illegal/ahx";
import { TAS } from "./illegal/tas";
import { XAA } from "./illegal/xaa";
import { SHY } from "./illegal/shy";
import { SHX } from "./illegal/shx";

export class OperationDecoder {
    private _cpu: Processor;
    private _opcodes: IAddressing[];

    constructor(cpu: Processor) {
        this._cpu = cpu;
        this._opcodes = this._getOpCodes(cpu);
    }

    public executeNextInstruction(): number {
        const opcode = OperationHelper.readNextInstruction(this._cpu);
        const opertion = this._opcodes[opcode];
        const delay = opertion.execute();
        return delay;
    }

    private _getOpCodes(cpu: Processor): IAddressing[] {
        const opCodes: IAddressing[] = [
            // OpCodes starting with 0x0
            new ImplicitAddressing(cpu, new BRK(cpu)),
            new IndirectIndexedYAddressing(cpu, new ORA(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new SLO(cpu)),
            new ZeroPageAddressing(cpu, new NOP(cpu)),
            new ZeroPageAddressing(cpu, new ORA(cpu)),
            new ZeroPageAddressing(cpu, new ASL(cpu)),
            new ZeroPageAddressing(cpu, new SLO(cpu)),
            new ImplicitAddressing(cpu, new PHP(cpu)),
            new ImmediateAddressing(cpu, new ORA(cpu)),
            new AccumulatorAddressing(cpu, new ASL(cpu)),
            new ImmediateAddressing(cpu, new ANC(cpu)),
            new AbsoluteAddressing(cpu, new NOP(cpu)),
            new AbsoluteAddressing(cpu, new ORA(cpu)),
            new AbsoluteAddressing(cpu, new ASL(cpu)),
            new AbsoluteAddressing(cpu, new SLO(cpu)),
            // OpCodes starting with 0x1
            new RelativeAddressing(cpu, new BPL(cpu)),
            new IndirectIndexedYAddressing(cpu, new ORA(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new SLO(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ORA(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ASL(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new SLO(cpu)),
            new ImplicitAddressing(cpu, new CLC(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new ORA(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new SLO(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ORA(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ASL(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new SLO(cpu)),
            // OpCodes starting with 0x2
            new AbsoluteAddressing(cpu, new JSR(cpu)),
            new IndirectIndexedXAddressing(cpu, new AND(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedXAddressing(cpu, new RLA(cpu)),
            new ZeroPageAddressing(cpu, new BIT(cpu)),
            new ZeroPageAddressing(cpu, new AND(cpu)),
            new ZeroPageAddressing(cpu, new ROL(cpu)),
            new ZeroPageAddressing(cpu, new RLA(cpu)),
            new ImplicitAddressing(cpu, new PLP(cpu)),
            new ImmediateAddressing(cpu, new AND(cpu)),
            new AccumulatorAddressing(cpu, new ROL(cpu)),
            new ImmediateAddressing(cpu, new ANC(cpu)),
            new AbsoluteAddressing(cpu, new BIT(cpu)),
            new AbsoluteAddressing(cpu, new AND(cpu)),
            new AbsoluteAddressing(cpu, new ROL(cpu)),
            new AbsoluteAddressing(cpu, new RLA(cpu)),
            // OpCodes starting with 0x3
            new RelativeAddressing(cpu, new BMI(cpu)),
            new IndirectIndexedYAddressing(cpu, new AND(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new RLA(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new AND(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ROL(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new RLA(cpu)),
            new ImplicitAddressing(cpu, new SEC(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new AND(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new RLA(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new AND(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ROL(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new RLA(cpu)),
            // OpCodes starting with 0x4
            new ImplicitAddressing(cpu, new RTI(cpu)),
            new IndirectIndexedXAddressing(cpu, new EOR(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedXAddressing(cpu, new SRE(cpu)),
            new ZeroPageAddressing(cpu, new NOP(cpu)),
            new ZeroPageAddressing(cpu, new EOR(cpu)),
            new ZeroPageAddressing(cpu, new LSR(cpu)),
            new ZeroPageAddressing(cpu, new SRE(cpu)),
            new ImplicitAddressing(cpu, new PHA(cpu)),
            new ImmediateAddressing(cpu, new EOR(cpu)),
            new AccumulatorAddressing(cpu, new LSR(cpu)),
            new ImmediateAddressing(cpu, new ALR(cpu)),
            new AbsoluteAddressing(cpu, new JMP(cpu)),
            new AbsoluteAddressing(cpu, new EOR(cpu)),
            new AbsoluteAddressing(cpu, new LSR(cpu)),
            new AbsoluteAddressing(cpu, new SRE(cpu)),
            // OpCodes starting with 0x5
            new RelativeAddressing(cpu, new BVC(cpu)),
            new IndirectIndexedYAddressing(cpu, new EOR(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new SRE(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new EOR(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new LSR(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new SRE(cpu)),
            new ImplicitAddressing(cpu, new CLI(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new EOR(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new SRE(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new EOR(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new LSR(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new SRE(cpu)),
            // OpCodes starting with 0x6
            new ImplicitAddressing(cpu, new RTS(cpu)),
            new IndirectIndexedXAddressing(cpu, new ADC(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedXAddressing(cpu, new RRA(cpu)),
            new ZeroPageAddressing(cpu, new NOP(cpu)),
            new ZeroPageAddressing(cpu, new ADC(cpu)),
            new ZeroPageAddressing(cpu, new ROR(cpu)),
            new ZeroPageAddressing(cpu, new RRA(cpu)),
            new ImplicitAddressing(cpu, new PLA(cpu)),
            new ImmediateAddressing(cpu, new ADC(cpu)),
            new AccumulatorAddressing(cpu, new ROR(cpu)),
            new ImmediateAddressing(cpu, new ARR(cpu)),
            new IndirectAddressing(cpu, new JMP(cpu)),
            new AbsoluteAddressing(cpu, new ADC(cpu)),
            new AbsoluteAddressing(cpu, new ROR(cpu)),
            new AbsoluteAddressing(cpu, new RRA(cpu)),
            // OpCodes starting with 0x7
            new RelativeAddressing(cpu, new BVS(cpu)),
            new IndirectIndexedYAddressing(cpu, new ADC(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new RRA(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ADC(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ROR(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new RRA(cpu)),
            new ImplicitAddressing(cpu, new SEI(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new ADC(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new RRA(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ADC(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ROR(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new RRA(cpu)),
            // OpCodes starting with 0x8
            new ImmediateAddressing(cpu, new NOP(cpu)),
            new IndirectIndexedXAddressing(cpu, new STA(cpu)),
            new ImmediateAddressing(cpu, new NOP(cpu)),
            new IndirectIndexedXAddressing(cpu, new SAX(cpu)),
            new ZeroPageAddressing(cpu, new STY(cpu)),
            new ZeroPageAddressing(cpu, new STA(cpu)),
            new ZeroPageAddressing(cpu, new STX(cpu)),
            new ZeroPageAddressing(cpu, new SAX(cpu)),
            new ImplicitAddressing(cpu, new DEY(cpu)),
            new ImmediateAddressing(cpu, new NOP(cpu)),
            new ImplicitAddressing(cpu, new TXA(cpu)),
            new ImmediateAddressing(cpu, new XAA(cpu)),
            new AbsoluteAddressing(cpu, new STY(cpu)),
            new AbsoluteAddressing(cpu, new STA(cpu)),
            new AbsoluteAddressing(cpu, new STX(cpu)),
            new AbsoluteAddressing(cpu, new SAX(cpu)),
            // OpCodes starting with 0x9
            new RelativeAddressing(cpu, new BCC(cpu)),
            new IndirectIndexedYAddressing(cpu, new STA(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new AHX(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new STY(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new STA(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new STX(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new SAX(cpu)),
            new ImplicitAddressing(cpu, new TYA(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new STA(cpu)),
            new ImplicitAddressing(cpu, new TXS(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new TAS(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new SHY(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new STA(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new SHX(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new AHX(cpu)),
            // OpCodes starting with 0xa
            new ImmediateAddressing(cpu, new LDY(cpu)),
            new IndirectIndexedXAddressing(cpu, new LDA(cpu)),
            new ImmediateAddressing(cpu, new LDY(cpu)),
            new IndirectIndexedXAddressing(cpu, new LAX(cpu)),
            new ZeroPageAddressing(cpu, new LDY(cpu)),
            new ZeroPageAddressing(cpu, new LDA(cpu)),
            new ZeroPageAddressing(cpu, new LDX(cpu)),
            new ZeroPageAddressing(cpu, new LAX(cpu)),
            new ImplicitAddressing(cpu, new TAY(cpu)),
            new ImmediateAddressing(cpu, new LDA(cpu)),
            new ImplicitAddressing(cpu, new TAX(cpu)),
            new ImmediateAddressing(cpu, new LAX(cpu)),
            new AbsoluteAddressing(cpu, new LDY(cpu)),
            new AbsoluteAddressing(cpu, new LDA(cpu)),
            new AbsoluteAddressing(cpu, new LDX(cpu)),
            new AbsoluteAddressing(cpu, new LAX(cpu)),
            // OpCodes starting with 0xb
            new RelativeAddressing(cpu, new BCS(cpu)),
            new IndirectIndexedYAddressing(cpu, new LDA(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new LAX(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new LDY(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new LDA(cpu)),
            new ZeroPageIndexedYAddressing(cpu, new LDX(cpu)),
            new ZeroPageIndexedYAddressing(cpu, new LAX(cpu)),
            new ImplicitAddressing(cpu, new CLV(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new LDA(cpu)),
            new ImplicitAddressing(cpu, new TSX(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new LAS(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new LDY(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new LDA(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new LDX(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new LAX(cpu)),
            // OpCodes starting with 0xc
            new ImmediateAddressing(cpu, new CPY(cpu)),
            new IndirectIndexedXAddressing(cpu, new CMP(cpu)),
            new ImmediateAddressing(cpu, new NOP(cpu)),
            new IndirectIndexedXAddressing(cpu, new DCP(cpu)),
            new ZeroPageAddressing(cpu, new CPY(cpu)),
            new ZeroPageAddressing(cpu, new CMP(cpu)),
            new ZeroPageAddressing(cpu, new DEC(cpu)),
            new ZeroPageAddressing(cpu, new DCP(cpu)),
            new ImplicitAddressing(cpu, new INY(cpu)),
            new ImmediateAddressing(cpu, new CMP(cpu)),
            new ImplicitAddressing(cpu, new DEX(cpu)),
            new ImmediateAddressing(cpu, new AXS(cpu)),
            new AbsoluteAddressing(cpu, new CPY(cpu)),
            new AbsoluteAddressing(cpu, new CMP(cpu)),
            new AbsoluteAddressing(cpu, new DEC(cpu)),
            new AbsoluteAddressing(cpu, new DCP(cpu)),
            // OpCodes starting with 0xd
            new RelativeAddressing(cpu, new BNE(cpu)),
            new IndirectIndexedYAddressing(cpu, new CMP(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new DCP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new CMP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new DEC(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new DCP(cpu)),
            new ImplicitAddressing(cpu, new CLD(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new CMP(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new DCP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new CMP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new DEC(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new DCP(cpu)),
            // OpCodes starting with 0xe
            new ImmediateAddressing(cpu, new CPX(cpu)),
            new IndirectIndexedXAddressing(cpu, new SBC(cpu)),
            new ImmediateAddressing(cpu, new NOP(cpu)),
            new IndirectIndexedXAddressing(cpu, new ISC(cpu)),
            new ZeroPageAddressing(cpu, new CPX(cpu)),
            new ZeroPageAddressing(cpu, new SBC(cpu)),
            new ZeroPageAddressing(cpu, new INC(cpu)),
            new ZeroPageAddressing(cpu, new ISC(cpu)),
            new ImplicitAddressing(cpu, new INX(cpu)),
            new ImmediateAddressing(cpu, new SBC(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new ImmediateAddressing(cpu, new SBC(cpu)),
            new AbsoluteAddressing(cpu, new CPX(cpu)),
            new AbsoluteAddressing(cpu, new SBC(cpu)),
            new AbsoluteAddressing(cpu, new INC(cpu)),
            new AbsoluteAddressing(cpu, new ISC(cpu)),
            // OpCodes starting with 0xf
            new RelativeAddressing(cpu, new BEQ(cpu)),
            new IndirectIndexedYAddressing(cpu, new SBC(cpu)),
            new ImplicitAddressing(cpu, new KIL(cpu)),
            new IndirectIndexedYAddressing(cpu, new ISC(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new NOP(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new SBC(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new INC(cpu)),
            new ZeroPageIndexedXAddressing(cpu, new ISC(cpu)),
            new ImplicitAddressing(cpu, new SED(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new SBC(cpu)),
            new ImplicitAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedYAddressing(cpu, new ISC(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new NOP(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new SBC(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new INC(cpu)),
            new AbsoluteIndexedXAddressing(cpu, new ISC(cpu))
        ]
        return opCodes;
    }
}