import { AddressingMode } from "../addressing-mode";

export interface IAddressing {

    readonly mode: AddressingMode;

    readonly length: number;

    execute(): number;
}