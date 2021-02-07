import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class STY implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        this._cpu.memory.write(address, this._cpu.registerY);
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
                delay = 4;
                break;
        }        
        return delay;
    }

}