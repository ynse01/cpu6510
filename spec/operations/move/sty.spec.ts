import { Processor } from "../../../src/cpu/processor";
import { STY } from "../../../src/cpu/operations/move/sty";

const cpu = new Processor();

describe('Operations.STY', ()=> {
    it('ShouldSetValueFromAccumulatorToMemoryAddress', ()=> {
        // Arrange
        const sty = new STY(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.registerY = expected;
        cpu.memory.write(address, 45);
        // Act
        sty.executeWithAddress(address);
        // Assert
        expect(cpu.memory.read(address)).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
    });
    it('ShouldNotTouchAnyFlags', ()=> {
        // Arrange
        const sty = new STY(cpu);
        const address = 0x1234;
        const expected = 87;
        cpu.registerY = expected;
        cpu.negativeFlag = true;
        cpu.carryFlag = true;
        cpu.zeroFlag = true;
        cpu.memory.write(address, 45);
        // Act
        sty.executeWithAddress(address);
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