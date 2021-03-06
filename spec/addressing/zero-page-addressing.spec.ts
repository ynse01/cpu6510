import { ByteHelper } from "../../src/byte-helper";
import { ZeroPageAddressing } from "../../src/cpu/addressing/zero-page-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('ZeroPageAddressing', ()=> {
    it('ShouldReadZeroPageAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x0076;
        const operation = new AddressOperationStub(cpu);
        const addressing = new ZeroPageAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        const value = 130;
        operation.setValueToBeWritten(value);
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(address);
        expect(cpu.memory.read(address)).toBe(value);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(address, 0);
    });
});