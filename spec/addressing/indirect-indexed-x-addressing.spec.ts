import { ByteHelper } from "../../src/byte-helper";
import { IndirectIndexedXAddressing } from "../../src/cpu/addressing/indirect-indexed-x-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('IndirectAddressing', ()=> {
    it('ShouldReadAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x0076;
        const indirect = 0x0088;
        const destination = 0x9999;
        const operation = new AddressOperationStub(cpu);
        const addressing = new IndirectIndexedXAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(indirect, ByteHelper.clipByte(destination));
        cpu.memory.write(indirect + 1, ByteHelper.highByte(destination));
        const value = 130;
        operation.setValueToBeWritten(value);
        cpu.registerX = 0x12;
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(destination);
        expect(cpu.memory.read(destination)).toBe(value);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(programAddress + 1, 0);
        cpu.memory.write(indirect, 0);
        cpu.memory.write(indirect + 1, 0);
        cpu.memory.write(destination, 0);
    });
});