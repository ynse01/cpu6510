import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class TAY implements IOperationImplicit {
    
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        this._cpu.registerY = this._cpu.accumulator;
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        const delay = 2;
        return delay;
    }

}