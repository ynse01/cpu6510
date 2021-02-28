import { ByteHelper } from "../src/byte-helper";

describe('ByteHelper.combine', ()=> {
    it('ShouldCombineBytesInLittleEndianOrder', ()=> {
        // Arrange
        const expected = 0x4223;
        const input0 = 0x23;
        const input1 = 0x42;
        // Act
        const actual = ByteHelper.combine(input0, input1);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldClipLowerByteBeforeCombining', ()=> {
        // Arrange
        const expected = 0x4223;
        const input0 = 0x0323;
        const input1 = 0x42;
        // Act
        const actual = ByteHelper.combine(input0, input1);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldClipHigherByteBeforeCombining', ()=> {
        // Arrange
        const expected = 0x4223;
        const input0 = 0x23;
        const input1 = 0x0442;
        // Act
        const actual = ByteHelper.combine(input0, input1);
        // Assert
        expect(actual).toBe(expected);
    });
});

describe('ByteHelper.highByte', ()=> {
    it('ShouldReturnZeroForSmallNumbers', ()=> {
        // Arrange
        const expected = 0;
        const input = 23;
        // Act
        const actual = ByteHelper.highByte(input);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldReturnUpperByteOnly', ()=> {
        // Arrange
        const expected = 0x42;
        const input = 0x4223;
        // Act
        const actual = ByteHelper.highByte(input);
        // Assert
        expect(actual).toBe(expected);
    });
});

describe('ByteHelper.clipByte', ()=> {
    it('ShouldReturnZeroFor256', ()=> {
        // Arrange
        const expected = 0;
        const input = 256;
        // Act
        const actual = ByteHelper.clipByte(input);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldReturnLowerByteOnly', ()=> {
        // Arrange
        const expected = 0x23;
        const input = 0x4223;
        // Act
        const actual = ByteHelper.clipByte(input);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldReturnPositiveNumber', ()=> {
        // Arrange
        const expected = 0x0100 - 0x23;
        const input = -0x23;
        // Act
        const actual = ByteHelper.clipByte(input);
        // Assert
        expect(actual).toBe(expected);
    });
});

describe('ByteHelper.signed', ()=> {
    it('ShouldReturnNegativeNumberForHighNumber', ()=> {
        // Arrange
        const expected = -96;
        const input = 223;
        // Act
        const actual = ByteHelper.signed(input);
        // Assert
        expect(actual).toBe(expected);
    });
    it('ShouldReturnPositiveNumberForSmallNumber', ()=> {
        // Arrange
        const expected = 0x23;
        const input = 0x23;
        // Act
        const actual = ByteHelper.signed(input);
        // Assert
        expect(actual).toBe(expected);
    });
});
