import { AddressingMode } from "../../addressing-mode";
import { Processor } from "../../processor";
import { IOperationWithAddress } from "../i-operation-with-address";

export class TAS implements IOperationWithAddress {
    constructor(cpu: Processor) {
        // Nothing to do here.
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