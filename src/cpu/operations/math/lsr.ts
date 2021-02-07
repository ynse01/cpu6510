import { Util } from "../../../util";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

export class LSR implements IOperationWithAddress, IOperationWithValue {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithValue(value: number): number {
        // In Javascript Numbers, multiplication is quicker than shifting.
        const result = Math.floor(value / 2);
        this._cpu.zeroFlag = result == 0;
        this._cpu.negativeFlag = result > 127;
        this._cpu.carryFlag = result > 255;
        this._cpu.accumulator = Util.clipByte(value);
        return 0;
    }
    
    public executeWithAddress(address: number): number {
        const value = this._cpu.memory.read(address);
        return this.executeWithValue(value);
    }
    
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
            case AddressingMode.Accumulator:
                delay = 2;
                break;
            case AddressingMode.ZeroPage:
                delay = 5;
                break;
            case AddressingMode.ZeroPageIndexedX:
            case AddressingMode.Absolute:
                delay = 6;
                break;
            case AddressingMode.AbsoluteIndexedX:
                delay = 7;
                break;
        }
        return delay;
    }

}