import { Processor } from "../src/cpu/processor";

const cpu = new Processor();

describe('SystemMemory', ()=> {
    it('ReadWriteRoundTrip', ()=> {
        // Arrange
        const address = 0x1234;
        const expected = 130;
        // Act
        cpu.memory.write(address, expected);
        const actual = cpu.memory.read(address);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldReadZeroOnUninitializedAddress', ()=> {
        // Arrange
        const address = 0x1234;
        const expected = 0;
        // Act
        const actual = cpu.memory.read(address);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
    });
    it('WriteShouldClipTheValueWritten', ()=> {
        // Arrange
        const address = 0x1234;
        const value = 0x0342;
        const expected = 0x42;
        // Act
        cpu.memory.write(address, value);
        const actual = cpu.memory.read(address);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('WriteShouldClipTheAddressWrittenTo', ()=> {
        // Arrange
        const address = 0x091234;
        const addressClipped = 0x1234;
        const expected = 0x42;
        // Act
        cpu.memory.write(address, expected);
        const actual = cpu.memory.read(addressClipped);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(addressClipped, 0);
    });
    it('ReadShouldClipTheAddressReadFrom', ()=> {
        // Arrange
        const address = 0x091234;
        const addressClipped = 0x1234;
        const expected = 0x42;
        // Act
        cpu.memory.write(addressClipped, expected);
        const actual = cpu.memory.read(address);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(addressClipped, 0);
    });
});