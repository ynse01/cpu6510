import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationImplicit } from "../i-operation-implicit";
import { IOperationWithAddress } from "../i-operation-with-address";
import { IOperationWithValue } from "../i-operation-with-value";

export class NOP implements IOperationImplicit, IOperationWithAddress, IOperationWithValue {
    
    constructor(_cpu: Processor) {
        // Nothing to do here.
    }

    public execute(): number {
        // Nothing to do here.
        return 0;
    }

    public executeWithAddress(_address: number): number {
        // Nothing to do here.
        return 0;
    }

    public executeWithValue(_offset: number): number {
        // Nothing to do here.
        return 0;
    }
        
    public delay(mode: AddressingMode): number {
        let delay = 0;
        switch(mode) {
            case AddressingMode.Immediate:
            case AddressingMode.Implicit:
                delay = 2;
                break;
            case AddressingMode.ZeroPage:
                delay = 3;
                break;
            case AddressingMode.ZeroPageIndexedX:
            case AddressingMode.Absolute:
            case AddressingMode.AbsoluteIndexedX:
                delay = 4;
                break;
        }
        return delay;
    }

}