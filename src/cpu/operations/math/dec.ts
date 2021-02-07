import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class DEC implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        const value = this._cpu.memory.read(address);
        const result = ByteHelper.clipByte(value - 1);
        this._cpu.memory.write(address, result);
        this._cpu.zeroFlag = result == 0;
        this._cpu.negativeFlag = result > 127;
        return 0;
    }
    
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
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