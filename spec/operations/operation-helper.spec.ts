import { ByteHelper } from "../../src/byte-helper";
import { RTI } from "../../src/cpu/operations/jumps/rti";
import { OperationHelper } from "../../src/cpu/operations/operation-helper";
import { Processor } from "../../src/cpu/processor";

const cpu = new Processor();

describe('OperationHelper', ()=> {
    it('PopStackShouldGetWhatWasPushed', ()=> {
        // Arrange
        cpu.reset();
        const expected = 0x42;
        // Act
        OperationHelper.pushStack(cpu, expected);
        var actual = OperationHelper.popStack(cpu);
        // Assert
        expect(actual).toBe(expected);
        expect(cpu.stackPointer).toBe(0xff);
    });
    it('GetStatusShouldGetWhatSetStatusWrote', ()=> {
        // Arrange
        cpu.reset();
        cpu.carryFlag = true;
        cpu.overflowFlag = true;
        // Act
        var actual = OperationHelper.getStatus(cpu);
        OperationHelper.setStatus(cpu, actual);
        // Assert
        expect(cpu.carryFlag).toBeTrue();
        expect(cpu.overflowFlag).toBeTrue();
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.decimalFlag).toBeFalse();
    });
    it('PopAllStateShouldGetWhatPushAllStatePushed', ()=> {
        // Arrange
        const source = 0x1234;
        cpu.reset();
        cpu.carryFlag = true;
        cpu.overflowFlag = true;
        cpu.programCounter = source;
        // Act
        OperationHelper.pushAllState(cpu);
        cpu.programCounter = 0x5678;
        cpu.carryFlag = false;
        OperationHelper.popAllState(cpu);
        // Assert
        expect(cpu.carryFlag).toBeTrue();
        expect(cpu.overflowFlag).toBeTrue();
        expect(cpu.negativeFlag).toBeFalse();
        expect(cpu.decimalFlag).toBeFalse();
        expect(cpu.programCounter).toBe(source);
    });
});