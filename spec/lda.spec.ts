import { Processor } from "../src/cpu/processor";
import { LDA } from "../src/cpu/operations/move/lda";

const cpu = new Processor();

describe('Operations.LDA', ()=> {
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128', ()=> {
        // Arrange
        const lda = new LDA(cpu);
        const expected = 130;
        // Act
        lda.executeWithValue(expected);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenLoadingValueZero', ()=> {
        // Arrange
        const lda = new LDA(cpu);
        const expected = 0;
        // Act
        lda.executeWithValue(expected);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128FromAddress', ()=> {
        // Arrange
        const lda = new LDA(cpu);
        const address = 0x1234;
        const expected = 130;
        cpu.memory.write(address, expected);
        // Act
        lda.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenLoadingValueZeroFromAddress', ()=> {
        // Arrange
        const lda = new LDA(cpu);
        const address = 0x1234;
        const expected = 0;
        cpu.memory.write(address, expected);
        // Act
        lda.executeWithAddress(address);
        // Assert
        expect(cpu.accumulator).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});