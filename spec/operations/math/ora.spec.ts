import { Processor } from "../../../src/cpu/processor";
import { ORA } from "../../../src/cpu/operations/math/ora";

const cpu = new Processor();

describe('Operations.ORA', ()=> {
    it('ShouldSetZeroFlagWhenResultOfBitwiseAndIsZero', ()=> {
        // Arrange
        const ora = new ORA(cpu);
        cpu.accumulator = 0;
        const value = 0;
        // Act
        ora.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(0);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultOfBitwiseAndIsNonZero', ()=> {
        // Arrange
        const ora = new ORA(cpu);
        cpu.accumulator = 96;
        const value = 32;
        // Act
        ora.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(96);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenMemoryValueIsBiggerThan128', ()=> {
        // Arrange
        const ora = new ORA(cpu);
        cpu.accumulator = 192;
        const value = 128;
        // Act
        ora.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(192);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenMemoryValueIsSmallerThan128', ()=> {
        // Arrange
        const ora = new ORA(cpu);
        cpu.accumulator = 32;
        const value = 64;
        // Act
        ora.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(96);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});