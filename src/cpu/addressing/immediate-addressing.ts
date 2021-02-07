import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithValue } from "../operations/i-operation-with-value";
import { OperationHelper } from "../operations/operation-helper";
import { IAddressing } from "./i-addressing";

export class ImmediateAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithValue;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithValue) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.Immediate;
    }

    public get length(): number {
        return 2;
    }

    public execute(): number {
        const value = OperationHelper.readNextInstruction(this._cpu);
        this._operation.executeWithValue(value);
        return this._delay;
    }
}