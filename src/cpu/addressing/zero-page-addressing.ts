import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { OperationHelper } from "../operations/operation-helper";
import { IAddressing } from "./i-addressing";

export class ZeroPageAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.ZeroPage;
    }

    public get length(): number {
        return 2;
    }

    public execute(): number {
        const address = OperationHelper.readNextInstruction(this._cpu);
        const extraCycles = this._operation.executeWithAddress(address);
        return this._delay + extraCycles;
    }
}