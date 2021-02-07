import { ByteHelper } from "../byte-helper";
import { RandomAccessMemoryBank } from "./random-access-memory-bank";

export class SystemMemory {
    private _ram: RandomAccessMemoryBank;

    constructor() {
        // Default memory layout:
        // - BASIC rom from $a000 to $bfff
        // - Character rom from $d000-$dfff
        // - VIC from $d400 to $d3ff
        // - SID from $d400 to $d7ff
        // - CIA1 from $dc00 to $dcff
        // - CIA2 from $dd00 to $ddff
        // - KERNAL from $e000 to $ffff
        this._ram = new RandomAccessMemoryBank(0, 65536);
    }

    public read(address: number): number {
        const clippedAddress = this._clipAddress(address);
        return this._ram.read(clippedAddress);
    }

    public write(address: number, value: number): void {
        const clippedAddress = this._clipAddress(address);
        const clippedValue = ByteHelper.clipByte(value);
        this._ram.write(clippedAddress, clippedValue);
    }

    public static pageBoundaryCrossPanalty(address0: number, address1: number): number {
        const high0 = ByteHelper.highByte(address0);
        const high1 = ByteHelper.highByte(address1);
        return (high0 != high1)? 1: 0;
    }

    private _clipAddress(address: number): number {
        // TODO: Clip on negative values also
        return address % 65536;
    }
}