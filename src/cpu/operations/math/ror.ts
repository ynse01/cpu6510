import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class ROR implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        let value = this._cpu.memory.read(address);
        // In Javascript Numbers, multiplication is quicker than shifting.
        value /= 2;
        this._cpu.memory.write(address, ByteHelper.clipByte(value));
        this._cpu.zeroFlag = value == 0;
        this._cpu.negativeFlag = value > 127;
        this._cpu.carryFlag = value > 255;
        return 0;
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