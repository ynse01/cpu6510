import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

export class LDA implements IOperationWithAddress, IOperationWithValue {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithValue(value: number): number {
        this._cpu.accumulator = value;
        this._cpu.zeroFlag = this._cpu.accumulator == 0;
        this._cpu.negativeFlag = this._cpu.accumulator > 127;
        return 0;
    }

    public executeWithAddress(address: number): number {
        const value = this._cpu.memory.read(address);
        return this.executeWithValue(value);
    }

    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch (mode) {
            case AddressingMode.Immediate:
                delay = 2;
                break;
            case AddressingMode.ZeroPage:
                delay = 3;
                break;
            case AddressingMode.ZeroPageIndexedX:
                delay = 4;
                break;
            case AddressingMode.Absolute:
                delay = 4;
                break;
            case AddressingMode.AbsoluteIndexedX:
                delay = 4;
                break;
            case AddressingMode.AbsoluteIndexedY:
                delay = 4;
                break;
            case AddressingMode.IndirectIndexedX:
                delay = 6;
                break;
            case AddressingMode.IndirectIndexedY:
                delay = 5;
                break;
        }
        return delay;
    }

}