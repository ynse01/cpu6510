import { Processor } from "../../../src/cpu/processor";
import { DEX } from "../../../src/cpu/operations/math/dex";

const cpu = new Processor();

describe('Operations.DEX', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const dex = new DEX(cpu);
        cpu.registerX = 5;
        const expected = cpu.registerX - 1;
        // Act
        dex.execute();
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
        const dex = new DEX(cpu);
        cpu.registerX = 129;
        const expected = cpu.registerX - 1;
        // Act
        dex.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const dex = new DEX(cpu);
        cpu.registerX = 129;
        const expected = cpu.registerX - 1;
        // Act
        dex.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagDueToOverflow', ()=> {
        // Arrange
        const dex = new DEX(cpu);
        cpu.registerX = 0;
        const expected = 255;
        // Act
        dex.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldClearZeroFlagDueToOverflow', ()=> {
        // Arrange
        const dex = new DEX(cpu);
        cpu.registerX = 0;
        const expected = 255;
        // Act
        dex.execute();
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
});