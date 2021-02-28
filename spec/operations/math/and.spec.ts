import { Processor } from "../../../src/cpu/processor";
import { AND } from "../../../src/cpu/operations/math/and";

const cpu = new Processor();

describe('Operations.AND', ()=> {
    it('ShouldSetZeroFlagWhenResultOfBitwiseAndIsZero', ()=> {
        // Arrange
        const and = new AND(cpu);
        cpu.accumulator = 128;
        const value = 64;
        // Act
        and.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(0);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultOfBitwiseAndIsNonZero', ()=> {
        // Arrange
        const and = new AND(cpu);
        cpu.accumulator = 96;
        const value = 32;
        // Act
        and.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(32);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenMemoryValueIsBiggerThan128', ()=> {
        // Arrange
        const and = new AND(cpu);
        cpu.accumulator = 192;
        const value = 128;
        // Act
        and.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(128);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenMemoryValueIsSmallerThan128', ()=> {
        // Arrange
        const and = new AND(cpu);
        cpu.accumulator = 192;
        const value = 64;
        // Act
        and.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(64);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});