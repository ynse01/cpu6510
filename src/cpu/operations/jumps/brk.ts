import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { OperationHelper } from "../operation-helper";

export class BRK implements IOperationImplicit {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        OperationHelper.pushAllState(this._cpu);
        this._cpu.programCounter = 0xFFFE;
        this._cpu.breakFlag = true;
        this._cpu.interruptFlag = true;
        return 0;
    }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delay(_mode: AddressingMode): number {
        const delay = 7;
        return delay;
    }
}