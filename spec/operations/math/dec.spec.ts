import { Processor } from "../../../src/cpu/processor";
import { DEC } from "../../../src/cpu/operations/math/dec";

const cpu = new Processor();

describe('Operations.DEC', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const dec = new DEC(cpu);
        const value = 5;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value - 1;
        // Act
        dec.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeFalse();
        expect(cpu.overflowFlag).toBeFalse();
        expect(cpu.carryFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetNegativeFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const dec = new DEC(cpu);
        const value = 129;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value - 1;
        // Act
        dec.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const dec = new DEC(cpu);
        const value = 129;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value - 1;
        // Act
        dec.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetNegativeFlagDueToOverflow', ()=> {
        // Arrange
        const dec = new DEC(cpu);
        const value = 0;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = 255;
        // Act
        dec.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearZeroFlagDueToOverflow', ()=> {
        // Arrange
        const dec = new DEC(cpu);
        const value = 0;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = 255;
        // Act
        dec.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});