import { AddressingMode } from "../../src/cpu/addressing-mode";
import { IOperationWithAddress } from "../../src/cpu/operations/i-operation-with-address";
import { Processor } from "../../src/cpu/processor";

export class AddressOperationStub implements IOperationWithAddress {
    private _cpu: Processor;
    private _lastAddress: number = -1;
    private _value: number = -1;

    constructor(cpu: Processor) {
        this._cpu = cpu;
    }

    public get lastAddress(): number {
        return this._lastAddress;
    }

    public setValueToBeWritten(value: number): void {
        this._value = value;
    }

    public executeWithAddress(address: number): number {
        this._lastAddress = address;
        this._cpu.memory.write(address, this._value);
        return 0;
    }

    public delay(mode: AddressingMode): number {
        return 1;
    }

}