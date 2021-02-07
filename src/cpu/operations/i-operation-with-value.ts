import { IOperation } from "./i-operation";

export interface IOperationWithValue extends IOperation {
    executeWithValue(value: number): number;
}