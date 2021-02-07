import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithValue } from "../i-operation-with-value";
import { OperationHelper } from "../operation-helper";

export class BMI implements IOperationWithValue {
    private _cpu: Processor;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public executeWithValue(offset: number): number {
        let extraBranching = 0;
        let extraCrossing = 0;
        if (this._cpu.negativeFlag) {
            extraBranching = 1;
            extraCrossing = OperationHelper.jumpRelative(this._cpu, offset);
        }
        return extraBranching + extraCrossing;
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