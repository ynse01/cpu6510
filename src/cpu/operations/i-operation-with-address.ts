import { IOperation } from "./i-operation";

export interface IOperationWithAddress extends IOperation {
    executeWithAddress(address: number): number;
}