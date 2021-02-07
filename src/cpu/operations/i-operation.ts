import { AddressingMode } from "../addressing-mode";

export interface IOperation {
    delay(mode: AddressingMode): number;
}