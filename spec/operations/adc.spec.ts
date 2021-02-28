import { Processor } from "../../src/cpu/processor";
import { ADC } from "../../src/cpu/operations/math/adc";

const cpu = new Processor();

describe('Operations.ADC', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 5;
        const value = 5;
        const expected = 10;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        expect(cpu.overflowFlag).toBeFalse();
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClaarCarryFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 5;
        const value = 125;
        const expected = 130;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 5;
        const value = 125;
        const expected = 130;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 5;
        const value = 125;
        const expected = 130;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetOverflowFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 5;
        const value = 125;
        const expected = 130;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.overflowFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZero', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 0;
        const value = 0;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenResultIsZero', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 0;
        const value = 0;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearCarryFlagWhenResultIsZero', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 0;
        const value = 0;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearOverflowFlagWhenResultIsZero', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 0;
        const value = 0;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.overflowFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 31;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 31;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetOverflowFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 31;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.overflowFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetCarryFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new ADC(cpu);
        cpu.accumulator = 31;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.carryFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});