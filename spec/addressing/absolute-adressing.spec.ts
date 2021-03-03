import { ByteHelper } from "../../src/byte-helper";
import { AbsoluteAddressing } from "../../src/cpu/addressing/absolute-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('AbsoluteAddressing', ()=> {
    it('ShouldReadAbsoluteAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x9876;
        const operation = new AddressOperationStub(cpu);
        const addressing = new AbsoluteAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(programAddress + 1, ByteHelper.highByte(address));
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
        cpu.memory.write(programAddress + 1, 0);
        cpu.memory.write(address, 0);
    });
});