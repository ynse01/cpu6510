import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

/* eslint-disable @typescript-eslint/no-unused-vars */
export class LAX implements IOperationWithAddress, IOperationWithValue {
    constructor(cpu: Processor) {
        // Nothing to do here.
    }

    public executeWithValue(value: number): number {
        //TODO: Implement.
        return 0;
    }

    public executeWithAddress(address: number): number {
        //TODO: Implement.
        return 0;
    }

    public delay(mode: AddressingMode): number {
        const delay = 0;
        return delay;
    }

}