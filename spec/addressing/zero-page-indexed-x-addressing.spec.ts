import { ByteHelper } from "../../src/byte-helper";
import { ZeroPageIndexedXAddressing } from "../../src/cpu/addressing/zero-page-indexed-x-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('ZeroPageIndexedXAddressing', ()=> {
    it('ShouldReadZeroPageAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x0076;
        const operation = new AddressOperationStub(cpu);
        const addressing = new ZeroPageIndexedXAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        const value = 130;
        operation.setValueToBeWritten(value);
        cpu.registerX = 0x12;
        const expected = 0x0088;
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(expected);
        expect(cpu.memory.read(expected)).toBe(value);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(address, 0);
        cpu.memory.write(expected, 0);
    });
});