import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationImplicit } from "../operations/i-operation-implicit";
import { IAddressing } from "./i-addressing";

export class ImplicitAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationImplicit;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationImplicit) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.Implicit;
    }

    public get length(): number {
        return 1;
    }

    public execute(): number {
        const extraCycles = this._operation.execute();
        return this._delay + extraCycles;
    }
}