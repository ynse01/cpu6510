import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { OperationHelper } from "../operation-helper";

export class RTS implements IOperationImplicit {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        OperationHelper.pushAllState(this._cpu);
        this._cpu.programCounter++;
        return 0;
    }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delay(_mode: AddressingMode): number {
        const delay = 6;
        return delay;
    }
}