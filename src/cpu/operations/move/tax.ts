import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class TAX implements IOperationImplicit {
    
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        this._cpu.registerX = this._cpu.accumulator;
        this._cpu.zeroFlag = this._cpu.registerX == 0;
        this._cpu.negativeFlag = this._cpu.registerX > 127;
        return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delay(_mode: AddressingMode): number {
        const delay = 2;
        return delay;
    }

}