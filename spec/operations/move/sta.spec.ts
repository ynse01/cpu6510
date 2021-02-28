import { Processor } from "../../../src/cpu/processor";
import { STA } from "../../../src/cpu/operations/move/sta";

const cpu = new Processor();

describe('Operations.STA', ()=> {
    it('ShouldSetValueFromAccumulatorToMemoryAddress', ()=> {
        // Arrange
        const sta = new STA(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.accumulator = expected;
        cpu.memory.write(address, 45);
        // Act
        sta.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldNotTouchAnyFlags', ()=> {
        // Arrange
        const sta = new STA(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.accumulator = expected;
        cpu.negativeFlag = true;
        cpu.carryFlag = true;
        cpu.zeroFlag = true;
        cpu.memory.write(address, 45);
        // Act
        sta.executeWithAddress(address);
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