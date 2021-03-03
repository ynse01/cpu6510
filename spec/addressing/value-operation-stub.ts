import { AddressingMode } from "../../src/cpu/addressing-mode";
import { IOperationWithValue } from "../../src/cpu/operations/i-operation-with-value";

export class ValueOperationStub implements IOperationWithValue {
    private _lastValue: number = -1;

    public get lastValue(): number {
        return this._lastValue;
    }

    public executeWithValue(value: number): number {
        this._lastValue = value;
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        return 1;
    }

}