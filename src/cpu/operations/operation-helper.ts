import { SystemMemory } from "../../memory/memory";
import { ByteHelper } from "../../byte-helper";
import { Processor } from "../processor";

export class OperationHelper {
    public static readNextInstruction(cpu: Processor): number {
        const value = cpu.memory.read(cpu.programCounter);
        cpu.programCounter++;
        return value;
    }

    public static jumpConditionally(cpu: Processor, condition: boolean, offset: number): number {
        let extraCycles = 0;
        if (condition == true) {
            const delta = ByteHelper.signed(offset);
            const source = cpu.programCounter;
            const destination = source + delta;
            const extraCrossing = SystemMemory.pageBoundaryCrossPenalty(source, destination);
            extraCycles = 1 + extraCrossing;
            // Jump to destination.
            cpu.programCounter = destination;
        }
        return extraCycles;
    }

    public static pushAllState(cpu: Processor): void {
        OperationHelper.pushStack(cpu, ByteHelper.clipByte(cpu.programCounter));
        OperationHelper.pushStack(cpu, ByteHelper.highByte(cpu.programCounter));
        OperationHelper.pushStack(cpu, OperationHelper.getStatus(cpu));
    }

    public static popAllState(cpu: Processor): void {
        OperationHelper.setStatus(cpu, OperationHelper.popStack(cpu));
        const value0 = OperationHelper.popStack(cpu);
        const value1 = OperationHelper.popStack(cpu);
        const address = ByteHelper.combine(value0, value1);
        cpu.programCounter = address;
    }

    public static pushStack(cpu: Processor, value: number): void {
        cpu.memory.write(cpu.stackPointer + 0x0100, value);
		cpu.stackPointer = ByteHelper.clipByte(cpu.stackPointer - 1);
    }

    public static popStack(cpu: Processor): number {
		cpu.stackPointer = ByteHelper.clipByte(cpu.stackPointer + 1);
        return cpu.memory.read(cpu.stackPointer + 0x0100);
    }

    public static getStatus(cpu: Processor): number {
        // bit5 is unused and always set.
        let result = 32;
        result += (cpu.negativeFlag) ? 128 : 0;
        result += (cpu.overflowFlag) ? 64 : 0;
        result += (cpu.breakFlag) ? 16 : 0;
        result += (cpu.decimalFlag) ? 8 : 0;
        result += (cpu.interruptFlag) ? 4 : 0;
        result += (cpu.zeroFlag) ? 2 : 0;
        result += (cpu.carryFlag) ? 1 : 0;
        return result;
    }

    public static setStatus(cpu: Processor, value: number): void {
        cpu.negativeFlag = ByteHelper.getBit7(value);
        cpu.overflowFlag = ByteHelper.getBit6(value);
        // Bit 5 is unused
        // Break flag is not touched.
        cpu.decimalFlag = ByteHelper.getBit3(value);
        cpu.interruptFlag = ByteHelper.getBit2(value);
        cpu.zeroFlag = ByteHelper.getBit1(value);
        cpu.carryFlag = ByteHelper.getBit0(value);
    }
}