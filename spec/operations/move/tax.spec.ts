import { Processor } from "../../../src/cpu/processor";
import { TAX } from "../../../src/cpu/operations/move/tax";

const cpu = new Processor();

describe('Operations.TAX', ()=> {
    it('ShouldClearAllFlagWhenTransferringNormalNumber', ()=> {
        // Arrange
        const tax = new TAX(cpu);
        cpu.accumulator = 30;
        // Act
        tax.execute();
        // Assert
        expect(cpu.registerX).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenTransferringValueBiggerThan128', ()=> {
        // Arrange
        const tax = new TAX(cpu);
        cpu.accumulator = 130;
        // Act
        tax.execute();
        // Assert
        expect(cpu.registerX).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenTransferringValueZero', ()=> {
        // Arrange
        const tax = new TAX(cpu);
        cpu.accumulator = 0;
        // Act
        tax.execute();
        // Assert
        expect(cpu.registerX).toBe(cpu.accumulator);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});