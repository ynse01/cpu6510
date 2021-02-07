import { IMemoryBank } from "./i-memory-bank";

export class RandomAccessMemoryBank implements IMemoryBank {
    private _offset: number;
    private _content: number[];

    constructor(offset: number, size: number) {
        this._offset = offset;
        this._content = [];
        // Initialize RAM content to zeros.
        for(let i = 0; i < 65536; i++) {
            this._content[i] = 0;
        }        
    }

    public read(address: number): number {
        return this._content[address - this._offset];
    }

    public write(address: number, value: number): void {
        this._content[address - this._offset] = value;
    }
}