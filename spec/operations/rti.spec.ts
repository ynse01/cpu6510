import { ByteHelper } from "../../src/byte-helper";
import { RTI } from "../../src/cpu/operations/jumps/rti";
import { OperationHelper } from "../../src/cpu/operations/operation-helper";
import { Processor } from "../../src/cpu/processor";

const cpu = new Processor();

describe('Operations.RTI', ()=> {
    it('ShouldRestoreStatusFlags', ()=> {
        // Arrange
        cpu.reset();
        cpu.carryFlag = true;
        cpu.decimalFlag = true;
        const rti = new RTI(cpu);
        const destination = 0x1234;
        const stack = 0x01ff;
        cpu.stackPointer = 0xfc;
        // Set stack content
        cpu.memory.write(stack, ByteHelper.clipByte(destination));
        cpu.memory.write(stack - 1, ByteHelper.highByte(destination));
        cpu.memory.write(stack - 2, OperationHelper.getStatus(cpu));
        // Act
        rti.execute();
        // Assert
        expect(cpu.breakFlag).toBeFalse();
        expect(cpu.interruptFlag).toBeTrue();
        expect(cpu.carryFlag).toBeTrue();
        expect(cpu.decimalFlag).toBeTrue();
    });
    it('ShouldSetProgramCounterToStackedAddress', ()=> {
        // Arrange
        cpu.reset();
        const rti = new RTI(cpu);
        const source = 0x5678;
        const destination = 0x1234;
        const stack = 0x01ff;
        cpu.programCounter = source;
        cpu.stackPointer = 0xfc;
        // Push on stack
        cpu.memory.write(stack, ByteHelper.clipByte(destination));
        cpu.memory.write(stack - 1, ByteHelper.highByte(destination));
        cpu.memory.write(stack - 2, OperationHelper.getStatus(cpu));
        // Act
        rti.execute();
        // Assert
        expect(cpu.programCounter).toBe(destination);
    });
});