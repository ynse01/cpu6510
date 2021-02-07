import { IOperation } from "./i-operation";

export interface IOperationImplicit extends IOperation {
    execute(): number;
}