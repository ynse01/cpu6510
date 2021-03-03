import { ImplicitAddressing } from "../../src/cpu/addressing/implicit-addressing";
import { Processor } from "../../src/cpu/processor";
import { ImplicitOperationStub } from "./implicit-operation-stub";

const cpu = new Processor();

describe('ImplicitAddressing', ()=> {
    it('ShouldExecuteOperation', ()=> {
        // Arrange
        const operation = new ImplicitOperationStub();
        const addressing = new ImplicitAddressing(cpu, operation);
        // Act
        addressing.execute();
        // Assert
        expect(operation.isExecuted).toBeTrue();
        // Cleanup
        cpu.reset();
    });
});