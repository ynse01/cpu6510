import { Processor } from "../../../src/cpu/processor";
import { LDY } from "../../../src/cpu/operations/move/ldy";

const cpu = new Processor();

describe('Operations.LDY', ()=> {
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128', ()=> {
        // Arrange
        const ldy = new LDY(cpu);
        const expected = 130;
        // Act
        ldy.executeWithValue(expected);
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenLoadingValueZero', ()=> {
        // Arrange
        const ldy = new LDY(cpu);
        const expected = 0;
        // Act
        ldy.executeWithValue(expected);
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128FromAddress', ()=> {
        // Arrange
        const ldy = new LDY(cpu);
        const address = 0x1234;
        const expected = 130;
        cpu.memory.write(address, expected);
        // Act
        ldy.executeWithAddress(address);
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenLoadingValueZeroFromAddress', ()=> {
        // Arrange
        const ldy = new LDY(cpu);
        const address = 0x1234;
        const expected = 0;
        cpu.memory.write(address, expected);
        // Act
        ldy.executeWithAddress(address);
        // Assert
        expect(cpu.registerY).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});