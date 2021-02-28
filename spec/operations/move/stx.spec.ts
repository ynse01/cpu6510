import { Processor } from "../../../src/cpu/processor";
import { STX } from "../../../src/cpu/operations/move/stx";

const cpu = new Processor();

describe('Operations.STX', ()=> {
    it('ShouldSetValueFromAccumulatorToMemoryAddress', ()=> {
        // Arrange
        const stx = new STX(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.registerX = expected;
        cpu.memory.write(address, 45);
        // Act
        stx.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldNotTouchAnyFlags', ()=> {
        // Arrange
        const stx = new STX(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.registerX = expected;
        cpu.negativeFlag = true;
        cpu.carryFlag = true;
        cpu.zeroFlag = true;
        cpu.memory.write(address, 45);
        // Act
        stx.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        expect(cpu.overflowFlag).toBeFalse();
        expect(cpu.zeroFlag).toBeTrue();
        expect(cpu.carryFlag).toBeTrue();
        expect(cpu.negativeFlag).toBeTrue();
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
});