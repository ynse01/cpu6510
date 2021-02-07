import { Processor } from "../../src/cpu/processor";

const cpu = new Processor();

describe('ZeroPageAddressing', ()=> {
    it('ShouldWriteToPageZero', ()=> {
        // Arrange
        const address = 0x0042;
        const addressZero = 0x42;
        const expected = 130;
        // Act
        cpu.memory.write(addressZero, expected);
        // Assert
        const actual = cpu.memory.read(address);
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
        cpu.memory.write(addressZero, 0);
    });
    it('ShouldReadFromPageZero', ()=> {
        // Arrange
        const address = 0x0042;
        const addressZero = 0x42;
        const expected = 130;
        cpu.memory.write(address, expected);
        // Act
        const actual = cpu.memory.read(addressZero);
        // Assert
        expect(actual).toBe(expected);
        // Cleanup
        cpu.reset();
        cpu.memory.write(address, 0);
        cpu.memory.write(addressZero, 0);
    });
});