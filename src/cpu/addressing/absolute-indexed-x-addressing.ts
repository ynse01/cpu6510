import { ByteHelper } from "../../byte-helper";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { AddressingMode } from "../addressing-mode";
import { IAddressing } from "./i-addressing";
import { OperationHelper } from "../operations/operation-helper";
import { SystemMemory } from "../../memory/memory";

export class AbsoluteIndexedXAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.AbsoluteIndexedX;
    }

    public get length(): number {
        return 3;
    }

   public execute(): number {
        const value0 = OperationHelper.readNextInstruction(this._cpu);
        const value1 = OperationHelper.readNextInstruction(this._cpu);
        const absolute = ByteHelper.combine(value0, value1);
        const address = absolute + this._cpu.registerX;
        this._operation.executeWithAddress(address);
        const extraCycles = SystemMemory.pageBoundaryCrossPenalty(absolute, address);
        return this._delay + extraCycles;
    }
}