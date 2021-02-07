import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { OperationHelper } from "../operation-helper";

export class PLP implements IOperationImplicit {
    
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        OperationHelper.popStack(this._cpu);
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        const delay = 4;
        return delay;
    }

}