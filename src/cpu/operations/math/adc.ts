import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

export class ADC implements IOperationWithAddress, IOperationWithValue {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithValue(value: number): number {
        const oldCarry = (this._cpu.carryFlag) ? 1 : 0;
        const result = this._cpu.accumulator + value + oldCarry;
        this._cpu.zeroFlag = (result % 256) == 0;
        // Overflow is set when negative flag (equivalent to bit 7) is flipped as a consequence of this operation.
        this._cpu.overflowFlag = (this._cpu.negativeFlag != (result >= 128));
        this._cpu.negativeFlag = result >= 128;
        this._cpu.carryFlag = result >= 255;
        this._cpu.accumulator = ByteHelper.clipByte(result);
        return 0;
    }
    
    public executeWithAddress(address: number): number {
        const value = this._cpu.memory.read(address);
        return this.executeWithValue(value);
    }
    
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
            case AddressingMode.Immediate:
                delay = 2;
                break;
            case AddressingMode.ZeroPage:
                delay = 3;
                break;
            case AddressingMode.ZeroPageIndexedX:
            case AddressingMode.Absolute:
            case AddressingMode.AbsoluteIndexedX:
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