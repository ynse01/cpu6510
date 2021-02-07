import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithValue } from "../i-operation-with-value";

export class XAA implements IOperationWithValue {
    constructor(cpu: Processor) {
        // Nothing to do here.
    }

    public executeWithValue(value: number): number {
        //TODO: Implement.
        return 0;
    }
        
    public delay(mode: AddressingMode): number {
        const delay = 0;
        return delay;
    }

}