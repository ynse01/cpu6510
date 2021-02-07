import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class JMP implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        this._cpu.programCounter = address;
        return 0;
    }
        
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
            case AddressingMode.Absolute:
                delay = 3;
                break;
            case AddressingMode.Indirect:
                delay = 5;
                break;
        }
        return delay;
    }
}