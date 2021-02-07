import { AddressingMode } from "../addressing-mode";
import { Processor } from "../processor";
import { IOperationWithAddress } from "../operations/i-operation-with-address";
import { IAddressing } from "./i-addressing";

export class AccumulatorAddressing implements IAddressing {
    private _cpu: Processor;
    private _operation: IOperationWithAddress;
    private _delay: number;

    constructor(cpu: Processor, operation: IOperationWithAddress) {
        this._cpu = cpu;
        this._operation = operation;
        this._delay = this._operation.delay(this.mode);
    }

    public get mode(): AddressingMode {
        return AddressingMode.Accumulator;
    }

    public get length(): number {
        return 1;
    }

    public execute(): number {
        // Address comamnd wich operates on the Accumulator. 
        // Use address -0x0042 as scratch.
        const address = -0x0042;
        const extraCycles = this._operation.executeWithAddress(address);
        this._cpu.accumulator = this._cpu.memory.read(address);
        return this._delay + extraCycles;
    }
}