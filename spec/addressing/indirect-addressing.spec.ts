import { ByteHelper } from "../../src/byte-helper";
import { IndirectAddressing } from "../../src/cpu/addressing/indirect-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('IndirectAddressing', ()=> {
    it('ShouldReadAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x9876;
        const indirect = 0x9888;
        const operation = new AddressOperationStub(cpu);
        const addressing = new IndirectAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(programAddress + 1, ByteHelper.highByte(address));
        cpu.memory.write(address, ByteHelper.clipByte(indirect));
        cpu.memory.write(address + 1, ByteHelper.highByte(indirect));
        const value = 130;
        operation.setValueToBeWritten(value);
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(indirect);
        expect(cpu.memory.read(indirect)).toBe(value);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(programAddress + 1, 0);
        cpu.memory.write(address, 0);
        cpu.memory.write(address + 1, 0);
        cpu.memory.write(indirect, 0);
    });
});