
export class ByteHelper {

    public static combine(value0: number, value1: number): number {
        return ByteHelper.clipByte(value0) + (256 * ByteHelper.clipByte(value1));
    }

    public static clipByte(val: number): number {
        return Math.abs(val % 256);
    }

    public static highByte(address: number): number {
        return Math.floor(address / 256);
    }

    public static signed(value: number): number {
        let result = value;
        if (value > 127) {
            result = -(value % 128) - 1;
        }
        return result;
    }

    public static getBit0(value: number): boolean {
        return (value % 2) > 0;
    }

    public static getBit1(value: number): boolean {
        return (value % 4) > 1;
    }

    public static getBit2(value: number): boolean {
        return (value % 8) > 3;
    }

    public static getBit3(value: number): boolean {
        return (value % 16) > 7;
    }

    public static getBit4(value: number): boolean {
        return (value % 32) > 15;
    }

    public static getBit5(value: number): boolean {
        return (value % 64) > 31;
    }

    public static getBit6(value: number): boolean {
        return (value % 128) > 63;
    }

    public static getBit7(value: number): boolean {
        return value > 127;
    }

}