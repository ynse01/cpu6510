import { ByteHelper } from "../../../byte-helper";
import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { OperationHelper } from "../operation-helper";

export class BRK implements IOperationImplicit {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public execute(): number {
        this._cpu.programCounter += 2;
        OperationHelper.pushAllState(this._cpu);
        // Move program counter to the IRQ Vector.
        const value0 = this._cpu.memory.read(0xfffe);
        const value1 = this._cpu.memory.read(0xffff);
        this._cpu.programCounter = ByteHelper.combine(value0, value1);
        this._cpu.breakFlag = true;
        this._cpu.interruptFlag = true;
        return 0;
    }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delay(_mode: AddressingMode): number {
        const delay = 7;
        return delay;
    }
}