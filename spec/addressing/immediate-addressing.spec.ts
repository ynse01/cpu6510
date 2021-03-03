import { ImmediateAddressing } from "../../src/cpu/addressing/immediate-addressing";
import { Processor } from "../../src/cpu/processor";
import { ValueOperationStub } from "./value-operation-stub";

const cpu = new Processor();

describe('ImmediateAddressing', ()=> {
    it('ShouldReadValueFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const expected = 142;
        const operation = new ValueOperationStub();
        const addressing = new ImmediateAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, expected);
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastValue;
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
    });
});