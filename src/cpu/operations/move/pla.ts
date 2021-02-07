import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";

export class PLA implements IOperationImplicit {
    
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        this._cpu.accumulator = this._cpu.stackPointer;
        this._cpu.stackPointer++;
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        const delay = 4;
        return delay;
    }

}