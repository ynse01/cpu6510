import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class STA implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        this._cpu.memory.write(address, this._cpu.accumulator);
        return 0;
    }

    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch (mode) {
            case AddressingMode.ZeroPage:
                delay = 3;
                break;
            case AddressingMode.ZeroPageIndexedY:
            case AddressingMode.Absolute:
            case AddressingMode.AbsoluteIndexedY:
                delay = 4;
                break;
            case AddressingMode.AbsoluteIndexedX:
            case AddressingMode.IndirectIndexedX:
            case AddressingMode.IndirectIndexedY:
                delay = 5;
                break;
        }        
        return delay;
    }

}