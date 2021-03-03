import { AddressingMode } from "../../src/cpu/addressing-mode";
import { IOperationWithAddress } from "../../src/cpu/operations/i-operation-with-address";

export class AddressOperationStub implements IOperationWithAddress {
    private _lastAddress: number = -1;
    public get lastAddress(): number {
        return this._lastAddress;
    }

    public executeWithAddress(address: number): number {
        this._lastAddress = address;
        return 0;
    }
    public delay(mode: AddressingMode): number {
        return 1;
    }

}