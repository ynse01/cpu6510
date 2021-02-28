import { Processor } from "../../../src/cpu/processor";
import { EOR } from "../../../src/cpu/operations/math/eor";

const cpu = new Processor();

describe('Operations.ORA', ()=> {
    it('ShouldSetZeroFlagWhenResultOfBitwiseAndIsZero', ()=> {
        // Arrange
        const eor = new EOR(cpu);
        cpu.accumulator = 0;
        const value = 0;
        // Act
        eor.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(0);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultOfBitwiseAndIsNonZero', ()=> {
        // Arrange
        const eor = new EOR(cpu);
        cpu.accumulator = 96;
        const value = 32;
        // Act
        eor.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(64);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenMemoryValueIsBiggerThan128', ()=> {
        // Arrange
        const eor = new EOR(cpu);
        cpu.accumulator = 192;
        const value = 64;
        // Act
        eor.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(128);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenMemoryValueIsSmallerThan128', ()=> {
        // Arrange
        const eor = new EOR(cpu);
        cpu.accumulator = 32;
        const value = 64;
        // Act
        eor.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(96);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});