
import { AccumulatorAddressing } from "../../src/cpu/addressing/accumulator-addressing";
import { Processor } from "../../src/cpu/processor";
import { AddressOperationStub } from "./address-operation-stub";

const cpu = new Processor();

describe('AccumulatorAddressing', ()=> {
    it('ShouldReadAbsoluteAddressFromInstructionStack', ()=> {
        // Arrange
        const operation = new AddressOperationStub(cpu);
        const addressing = new AccumulatorAddressing(cpu, operation);
        const expected = 0x0042;
        const value = 130;
        operation.setValueToBeWritten(value);
        // Act
        addressing.execute();
        // Assert
        const actual = operation.lastAddress;
        expect(actual).toBe(expected);
        expect(cpu.accumulator).toBe(value);
        // Cleanup
        cpu.reset();
    });
});