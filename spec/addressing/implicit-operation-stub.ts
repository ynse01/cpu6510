import { AddressingMode } from "../../src/cpu/addressing-mode";
import { IOperationImplicit } from "../../src/cpu/operations/i-operation-implicit";

export class ImplicitOperationStub implements IOperationImplicit {
    private _isExecuted = false;

    public get isExecuted(): boolean {
        return this._isExecuted;
    }

    public execute(): number {
        this._isExecuted = true;
        return 0;
    }

    public delay(_mode: AddressingMode): number {
        return 1;
    }

}