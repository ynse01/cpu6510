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
        // Check bit 7 of memory value
        this._cpu.negativeFlag = value > 127;
        // Check bit 6 of memory value
        this._cpu.overflowFlag = (value % 128) > 63;
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