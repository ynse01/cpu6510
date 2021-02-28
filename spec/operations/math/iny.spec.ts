import { Processor } from "../../../src/cpu/processor";
import { INY } from "../../../src/cpu/operations/math/iny";

const cpu = new Processor();

describe('Operations.INY', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const iny = new INY(cpu);
        cpu.registerY = 5;
        const expected = cpu.registerY + 1;
        // Act
        iny.execute();
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
        const iny = new INY(cpu);
        cpu.registerY = 128;
        const expected = cpu.registerY + 1;
        // Act
        iny.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const iny = new INY(cpu);
        cpu.registerY = 128;
        const expected = cpu.registerY + 1;
        // Act
        iny.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearNegativeFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const iny = new INY(cpu);
        cpu.registerY = 255;
        const expected = 0;
        // Act
        iny.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const iny = new INY(cpu);
        cpu.registerY = 255;
        const expected = 0;
        // Act
        iny.execute();
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});