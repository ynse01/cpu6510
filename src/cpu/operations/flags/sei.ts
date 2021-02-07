import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class SEI implements IOperationImplicit {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        this._cpu.interruptFlag = true;
        return 0;
    }
        
    public delay(_mode: AddressingMode): number {
        const delay = 2;
        return delay;
    }

}