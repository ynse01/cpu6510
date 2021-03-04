import { ByteHelper } from "../../src/byte-helper";
import { RelativeAddressing } from "../../src/cpu/addressing/relative-addressing";
import { Processor } from "../../src/cpu/processor";
import { ValueOperationStub } from "./value-operation-stub";

const cpu = new Processor();

describe('RelativeAddressing', ()=> {
    it('ShouldReadPositiveDeltaFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const delta = 0x76;
        const operation = new ValueOperationStub();
        const addressing = new RelativeAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, delta);
        const expected = delta;
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastValue;
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
    });
    it('ShouldReadNegativeDeltaFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const delta = -0x0076;
        const operation = new ValueOperationStub();
        const addressing = new RelativeAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, delta);
        const expected = 256 + delta;
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