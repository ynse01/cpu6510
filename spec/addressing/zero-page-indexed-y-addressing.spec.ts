import { ByteHelper } from "../../src/byte-helper";
import { ZeroPageIndexedYAddressing } from "../../src/cpu/addressing/zero-page-indexed-y-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('ZeroPageIndexedYAddressing', ()=> {
    it('ShouldReadZeroPageAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x0076;
        const operation = new AddressOperationStub(cpu);
        const addressing = new ZeroPageIndexedYAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        const value = 130;
        operation.setValueToBeWritten(value);
        cpu.registerY = 0x12;
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