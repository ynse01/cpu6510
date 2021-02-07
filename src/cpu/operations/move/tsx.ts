import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class TSX implements IOperationImplicit {
    
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        const address = ByteHelper.combine(this._cpu.stackPointer, 0x01);
        const value = this._cpu.memory.read(address);
        this._cpu.registerX = value;
        this._cpu.zeroFlag = value == 0;
        this._cpu.negativeFlag = value > 127;
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        const delay = 2;
        return delay;
    }

}