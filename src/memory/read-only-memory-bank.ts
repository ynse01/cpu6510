import { IMemoryBank } from "./i-memory-bank";

export class ReadOnlyMemoryBank implements IMemoryBank {
    private _content: number[];
    private _offset: number;
    private _ram: IMemoryBank;

    constructor(content: number[], offset: number, ram: IMemoryBank) {
        this._content = content;
        this._offset = offset;
        this._ram = ram;
    }

    read(address: number): number {
        return this._content[address - this._offset];
    }
    write(address: number, value: number): void {
        this._ram.write(address, value);
    }

}