import { ByteHelper } from "../../byte-helper";
import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { OperationHelper } from "../operations/operation-helper";
import { IAddressing } from "./i-addressing";

export class IndirectIndexedYAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.IndirectIndexedY;
    }

    public get length(): number {
        return 2;
    }

    public execute(): number {
        const lookup = OperationHelper.readNextInstruction(this._cpu);
        const lookupValue0 = this._cpu.memory.read(lookup);
        const lookupValue1 = this._cpu.memory.read(lookup + 1);
        const baseAddress = ByteHelper.combine(lookupValue0, lookupValue1);
        const address = baseAddress + this._cpu.registerY;
        const extraCycles = this._operation.executeWithAddress(address);
        return this._delay + extraCycles;
    }
}