
export interface IMemoryBank {
    read(address: number): number;

    write(address: number, value: number): void;
}