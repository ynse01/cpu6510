import { Processor } from "../../../src/cpu/processor";
import { TAY } from "../../../src/cpu/operations/move/tay";

const cpu = new Processor();

describe('Operations.TAY', ()=> {
    it('ShouldClearAllFlagWhenTransferringNormalNumber', ()=> {
        // Arrange
        const tay = new TAY(cpu);
        cpu.accumulator = 30;
        // Act
        tay.execute();
        // Assert
        expect(cpu.registerY).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenTransferringValueBiggerThan128', ()=> {
        // Arrange
        const tay = new TAY(cpu);
        cpu.accumulator = 130;
        // Act
        tay.execute();
        // Assert
        expect(cpu.registerY).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenTransferringValueZero', ()=> {
        // Arrange
        const tay = new TAY(cpu);
        cpu.accumulator = 0;
        // Act
        tay.execute();
        // Assert
        expect(cpu.registerY).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});