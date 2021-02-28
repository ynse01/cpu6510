import { Processor } from "../../../src/cpu/processor";
import { TYA } from "../../../src/cpu/operations/move/tya";

const cpu = new Processor();

describe('Operations.TYA', ()=> {
    it('ShouldClearAllFlagWhenTransferringNormalNumber', ()=> {
        // Arrange
        const tya = new TYA(cpu);
        cpu.registerY = 30;
        // Act
        tya.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerY);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenTransferringValueBiggerThan128', ()=> {
        // Arrange
        const tya = new TYA(cpu);
        cpu.registerY = 130;
        // Act
        tya.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerY);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenTransferringValueZero', ()=> {
        // Arrange
        const tya = new TYA(cpu);
        cpu.registerY = 0;
        // Act
        tya.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerY);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});