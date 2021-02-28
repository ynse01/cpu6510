import { Processor } from "../../src/cpu/processor";
import { DEY } from "../../src/cpu/operations/math/dey";

const cpu = new Processor();

describe('Operations.DEY', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const dey = new DEY(cpu);
        cpu.registerY = 5;
        const expected = cpu.registerY - 1;
        // Act
        dey.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        expect(cpu.overflowFlag).toBeFalse();
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const dey = new DEY(cpu);
        cpu.registerY = 129;
        const expected = cpu.registerY - 1;
        // Act
        dey.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const dey = new DEY(cpu);
        cpu.registerY = 129;
        const expected = cpu.registerY - 1;
        // Act
        dey.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagDueToOverflow', ()=> {
        // Arrange
        const dey = new DEY(cpu);
        cpu.registerY = 0;
        const expected = 255;
        // Act
        dey.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagDueToOverflow', ()=> {
        // Arrange
        const dey = new DEY(cpu);
        cpu.registerY = 0;
        const expected = 255;
        // Act
        dey.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});