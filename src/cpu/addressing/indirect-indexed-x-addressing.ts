import { ByteHelper } from "../../byte-helper";
import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { OperationHelper } from "../operations/operation-helper";
import { IAddressing } from "./i-addressing";

export class IndirectIndexedXAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.IndirectIndexedX;
    }

    public get length(): number {
        return 2;
    }

    public execute(): number {
        const value = OperationHelper.readNextInstruction(this._cpu);
        const lookup = value + this._cpu.registerX;
        const lookupValue0 = this._cpu.memory.read(lookup);
        const lookupValue1 = this._cpu.memory.read(lookup + 1);
        const address = ByteHelper.combine(lookupValue0, lookupValue1);
        this._operation.executeWithAddress(address);
        return this._delay;
    }
}