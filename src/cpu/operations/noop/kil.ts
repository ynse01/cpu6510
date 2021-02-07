import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

export class KIL implements IOperationImplicit, IOperationWithAddress, IOperationWithValue {
    
    constructor(cpu: Processor) {
        // Nothing to do here.
    }

    public executeWithValue(_value: number): number {
        throw new Error("Invalid instruction.");
    }

    public executeWithAddress(_address: number): number {
        throw new Error("Invalid instruction.");
    }

    public execute(): number {
        throw new Error("Invalid instruction.");
    }

    public delay(_mode: AddressingMode): number {
        return 0;
    }

}