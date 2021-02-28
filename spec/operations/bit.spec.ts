import { Processor } from "../../src/cpu/processor";
import { BIT } from "../../src/cpu/operations/math/bit";

const cpu = new Processor();

describe('Operations.BIT', ()=> {
    it('ShouldClearZeroFlagWhenResultOfBitwiseAndIsZero', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 128);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(128);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenResultOfBitwiseAndIsOne', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(128);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetNegativeFlagWhenMemoryValueIsBiggerThan128', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 64;
        const address = 0x1234;
        cpu.memory.write(address, 128);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(64);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearNegativeFlagWhenMemoryValueIsSmallerThan128', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(128);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetOverflowFlagWhenMemoryValueIsBiggerThan64', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 6;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(6);
        expect(cpu.overflowFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearOverflowFlagWhenMemoryValueIsSmallerThan64', ()=> {
        // Arrange
        const bit = new BIT(cpu);
        cpu.accumulator = 6;
        const address = 0x1234;
        cpu.memory.write(address, 32);
        // Act
        bit.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(6);
        expect(cpu.overflowFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});