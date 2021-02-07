import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class DEX implements IOperationImplicit {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        const result = ByteHelper.clipByte(this._cpu.registerX - 1);
        this._cpu.registerX = result;
        this._cpu.zeroFlag = result == 0;
        this._cpu.negativeFlag = result > 127;
        return 0;
    }
    
    public delay(mode: AddressingMode): number {
        const delay = 2;
        return delay;
    }

}