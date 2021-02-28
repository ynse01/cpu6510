import { Processor } from "../../../src/cpu/processor";
import { TXA } from "../../../src/cpu/operations/move/txa";

const cpu = new Processor();

describe('Operations.TXA', ()=> {
    it('ShouldClearAllFlagWhenTransferringNormalNumber', ()=> {
        // Arrange
        const txa = new TXA(cpu);
        cpu.registerX = 30;
        // Act
        txa.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerX);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenTransferringValueBiggerThan128', ()=> {
        // Arrange
        const txa = new TXA(cpu);
        cpu.registerX = 130;
        // Act
        txa.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerX);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenTransferringValueZero', ()=> {
        // Arrange
        const txa = new TXA(cpu);
        cpu.registerX = 0;
        // Act
        txa.execute();
        // Assert
        expect(cpu.accumulator).toBe(cpu.registerX);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});