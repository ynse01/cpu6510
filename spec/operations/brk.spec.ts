import { ByteHelper } from "../../src/byte-helper";
import { BRK } from "../../src/cpu/operations/jumps/brk";
import { Processor } from "../../src/cpu/processor";

const cpu = new Processor();

describe('Operations.BRK', ()=> {
    it('ShouldSetBreakAndInterruptFlags', ()=> {
        // Arrange
        cpu.reset();
        const brk = new BRK(cpu);
        const destination = 0x1234;
        const irqVector = 0xfffe;
        // Set IRQ Vector
        cpu.memory.write(irqVector, ByteHelper.clipByte(destination));
        cpu.memory.write(irqVector + 1, ByteHelper.highByte(destination));
        // Act
        brk.execute();
        // Assert
        expect(cpu.breakFlag).toBeTrue();
        expect(cpu.interruptFlag).toBeTrue();
    });
    it('ShouldJumpToInterruptVectorAddress', ()=> {
        // Arrange
        cpu.reset();
        const brk = new BRK(cpu);
        const source = 0x5678;
        const destination = 0x1234;
        const irqVector = 0xfffe;
        cpu.programCounter = source;
        cpu.stackPointer = 0xff;
        // Set IRQ Vector
        cpu.memory.write(irqVector, ByteHelper.clipByte(destination));
        cpu.memory.write(irqVector + 1, ByteHelper.highByte(destination));
        // Act
        brk.execute();
        // Assert
        expect(cpu.programCounter).toBe(destination);
        // BRK pushes program counter + 2 on the stack.
        expect(cpu.memory.read(0x01ff)).toBe(ByteHelper.clipByte(0x5678) + 2);
        expect(cpu.memory.read(0x01fe)).toBe(ByteHelper.highByte(0x5678));
        // Bit5 and Interrupt flag should be set
        expect(cpu.memory.read(0x01fd)).toBe(0x24);
    });
});