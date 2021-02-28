import { Processor } from "../../src/cpu/processor";
import { INC } from "../../src/cpu/operations/math/inc";

const cpu = new Processor();

describe('Operations.INC', ()=> {
    it('ShouldSetNoFlagWhenResultIsSmallerThan128', ()=> {
        // Arrange
        const inc = new INC(cpu);
        const value = 5;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value + 1;
        // Act
        inc.executeWithAddress(address);
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
        const inc = new INC(cpu);
        const value = 128;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value + 1;
        // Act
        inc.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearZeroFlagWhenResultIsBiggerThan128', ()=> {
        // Arrange
        const inc = new INC(cpu);
        const value = 128;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = value + 1;
        // Act
        inc.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.zeroFlag).toBeFalse();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldClearNegativeFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const inc = new INC(cpu);
        const value = 255;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = 0;
        // Act
        inc.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldSetZeroFlagWhenResultIsZeroDueToOverflow', ()=> {
        // Arrange
        const inc = new INC(cpu);
        const value = 255;
        const address = 0x1234;
        cpu.memory.write(address, value);
        const expected = 0;
        // Act
        inc.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.zeroFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});