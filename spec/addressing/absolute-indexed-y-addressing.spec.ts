import { ByteHelper } from "../../src/byte-helper";
import { AbsoluteIndexedYAddressing } from "../../src/cpu/addressing/absolute-indexed-y-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('AbsoluteIndexexYAddressing', ()=> {
    it('ShouldReadAbsoluteAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x9876;
        const operation = new AddressOperationStub(cpu);
        const addressing = new AbsoluteIndexedYAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(programAddress + 1, ByteHelper.highByte(address));
        cpu.registerY = 0x12;
        const expected = 0x9888;
        const value = 130;
        operation.setValueToBeWritten(value);
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(expected);
        expect(cpu.memory.read(expected)).toBe(value);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(programAddress + 1, 0);
        cpu.memory.write(address, 0);
    });
});