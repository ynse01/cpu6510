import { Processor } from "../../../src/cpu/processor";
import { LDX } from "../../../src/cpu/operations/move/ldx";

const cpu = new Processor();

describe('Operations.LDX', ()=> {
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128', ()=> {
        // Arrange
        const ldx = new LDX(cpu);
        const expected = 130;
        // Act
        ldx.executeWithValue(expected);
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetZeroFlagWhenLoadingValueZero', ()=> {
        // Arrange
        const ldx = new LDX(cpu);
        const expected = 0;
        // Act
        ldx.executeWithValue(expected);
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
    });
    it('ShouldSetNegativeFlagWhenLoadingValueBiggerThan128FromAddress', ()=> {
        // Arrange
        const ldx = new LDX(cpu);
        const address = 0x1234;
        const expected = 130;
        cpu.memory.write(address, expected);
        // Act
        ldx.executeWithAddress(address);
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenLoadingValueZeroFromAddress', ()=> {
        // Arrange
        const ldx = new LDX(cpu);
        const address = 0x1234;
        const expected = 0;
        cpu.memory.write(address, expected);
        // Act
        ldx.executeWithAddress(address);
        // Assert
        expect(cpu.registerX).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});