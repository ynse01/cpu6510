import { Util } from "../../util";
import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { OperationHelper } from "../operations/operation-helper";
import { IAddressing } from "./i-addressing";

export class IndirectAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.Indirect;
    }

    public get length(): number {
        return 3;
    }

    public execute(): number {
        const value0 = OperationHelper.readNextInstruction(this._cpu);
        const value1 = OperationHelper.readNextInstruction(this._cpu);
        const lookupAddress = Util.combine(value0, value1);
        const lookupValue0 = this._cpu.memory.read(lookupAddress);
        const lookupValue1 = this._cpu.memory.read(lookupAddress + 1);
        const address = Util.combine(lookupValue0, lookupValue1);
        const extraCycles = this._operation.executeWithAddress(address);
        return this._delay + extraCycles;
    }
}