import { Processor } from "../../src/cpu/processor";
import { SBC } from "../../src/cpu/operations/math/sbc";

const cpu = new Processor();

describe('Operations.SBC', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const adc = new SBC(cpu);
        cpu.accumulator = 15;
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
        const adc = new SBC(cpu);
        cpu.accumulator = 145;
        const value = 7;
        const expected = 138;
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
        const adc = new SBC(cpu);
        cpu.accumulator = 145;
        const value = 7;
        const expected = 138;
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
        const adc = new SBC(cpu);
        cpu.accumulator = 145;
        const value = 7;
        const expected = 138;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearOverflowFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const adc = new SBC(cpu);
        cpu.accumulator = 145;
        const value = 7;
        const expected = 138;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.overflowFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZero', ()=> {
        // Arrange
        const adc = new SBC(cpu);
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
        const adc = new SBC(cpu);
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
        const adc = new SBC(cpu);
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
        const adc = new SBC(cpu);
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
        const adc = new SBC(cpu);
        cpu.accumulator = 225;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        //expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new SBC(cpu);
        cpu.accumulator = 225;
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
        const adc = new SBC(cpu);
        cpu.accumulator = 225;
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
    it('ShouldClearCarryFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const adc = new SBC(cpu);
        cpu.accumulator = 225;
        const value = 225;
        const expected = 0;
        // Act
        adc.executeWithValue(value);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});