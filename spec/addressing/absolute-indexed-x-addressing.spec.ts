import { ByteHelper } from "../../src/byte-helper";
import { AbsoluteIndexedXAddressing } from "../../src/cpu/addressing/absolute-indexed-x-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('AbsoluteIndexexXAddressing', ()=> {
    it('ShouldReadAbsoluteAddressFromInstructionStack', ()=> {
        // Arrange
        const programAddress = 0x1234;
        const address = 0x9876;
        const operation = new AddressOperationStub();
        const addressing = new AbsoluteIndexedXAddressing(cpu, operation);
        cpu.programCounter = programAddress;
        cpu.memory.write(programAddress, ByteHelper.clipByte(address));
        cpu.memory.write(programAddress + 1, ByteHelper.highByte(address));
        cpu.registerX = 0x12;
        const expected = 0x9888;
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(programAddress, 0);
        cpu.memory.write(programAddress + 1, 0);
        cpu.memory.write(address, 0);
    });
});