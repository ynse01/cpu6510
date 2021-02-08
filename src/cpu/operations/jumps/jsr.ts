import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";
import { OperationHelper } from "../operation-helper";

export class JSR implements IOperationWithAddress {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithAddress(address: number): number {
        this._cpu.programCounter += 2;
        OperationHelper.pushAllState(this._cpu);
        this._cpu.programCounter = address;
        return 0;
    }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delay(_mode: AddressingMode): number {
        const delay = 7;
        return delay;
    }
}