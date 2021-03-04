import { ByteHelper } from "../../src/byte-helper";
import { IndirectIndexedYAddressing } from "../../src/cpu/addressing/indirect-indexed-y-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('IndirectAddressing', ()=> {
    it('ShouldReadAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x0076;
        const indirect = 0x9988;
        const destination = 0x9999;
        const operation = new AddressOperationStub(cpu);
        const addressing = new IndirectIndexedYAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(address, ByteHelper.clipByte(indirect));
        cpu.memory.write(address + 1, ByteHelper.highByte(indirect));
        const value = 130;
        operation.setValueToBeWritten(value);
        cpu.registerY = 0x11;
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
        cpu.memory.write(address, 0);
        cpu.memory.write(address + 1, 0);
        cpu.memory.write(destination, 0);
    });
});