import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class BIT implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        const value = this._cpu.memory.read(address);
        const and = this._cpu.accumulator & value;
        this._cpu.zeroFlag = and == 0;
        this._cpu.negativeFlag = value > 127;
        this._cpu.overflowFlag = value > 255;
        return 0;
    }
    
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
            case AddressingMode.ZeroPage:
                delay = 3;
                break;
            case AddressingMode.Absolute:
                delay = 4;
                break;
        }
        return delay;
    }

}