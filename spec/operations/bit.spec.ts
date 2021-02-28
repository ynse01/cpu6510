import { Processor } from "../../src/cpu/processor";
import { BIT } from "../../src/cpu/operations/math/bit";

const cpu = new Processor();

describe('Operations.BIT', ()=> {
    it('ShouldClearZeroFlagWhenResultOfBitwiseAndIsZero', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 128);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenResultOfBitwiseAndIsOne', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetNegativeFlagWhenMemoryValueIsBiggerThan128', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 64;
        const address = 0x1234;
        cpu.memory.write(address, 128);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearNegativeFlagWhenMemoryValueIsSmallerThan128', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 128;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetOverflowFlagWhenMemoryValueIsBiggerThan64', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 6;
        const address = 0x1234;
        cpu.memory.write(address, 64);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.overflowFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearOverflowFlagWhenMemoryValueIsSmallerThan64', ()=> {
        // Arrange
        const adc = new BIT(cpu);
        cpu.accumulator = 6;
        const address = 0x1234;
        cpu.memory.write(address, 32);
        // Act
        adc.executeWithAddress(address);
        // Assert
        expect(cpu.overflowFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});