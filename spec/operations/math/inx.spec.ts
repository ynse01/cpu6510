import { Processor } from "../../../src/cpu/processor";
import { INX } from "../../../src/cpu/operations/math/inx";

const cpu = new Processor();

describe('Operations.INX', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const inx = new INX(cpu);
        cpu.registerX = 5;
        const expected = cpu.registerX + 1;
        // Act
        inx.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        expect(cpu.overflowFlag).toBeFalse();
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const inx = new INX(cpu);
        cpu.registerX = 128;
        const expected = cpu.registerX + 1;
        // Act
        inx.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const inx = new INX(cpu);
        cpu.registerX = 128;
        const expected = cpu.registerX + 1;
        // Act
        inx.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const inx = new INX(cpu);
        cpu.registerX = 255;
        const expected = 0;
        // Act
        inx.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const inx = new INX(cpu);
        cpu.registerX = 255;
        const expected = 0;
        // Act
        inx.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});