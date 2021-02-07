import { SystemMemory } from "../memory/memory";
import { OperationDecoder } from "./operations/operation-decoder";

export class Processor {
    public negativeFlag = false;
    public overflowFlag = false;
    public breakFlag = false;
    public decimalFlag = false;
    public interruptFlag = true;
    public zeroFlag = false;
    public carryFlag = false;
    
    public accumulator = 0;
    public registerX = 0;
    public registerY = 0;
    public programCounter = 0xfffc;
    public stackPointer = 0xff;

    public memory: SystemMemory;
    private _decoder: OperationDecoder;

    constructor() {
        this.memory = new SystemMemory();
        this._decoder = new OperationDecoder(this);
        this.reset();
    }

    public executeNextInstruction(): number {
        return this._decoder.executeNextInstruction();
    }

    public reset(): void {
        this.accumulator = 0;
        this.registerX = 0;
        this.registerY = 0;
        this.carryFlag = false;
        this.breakFlag = false;
        this.decimalFlag = false;
        this.interruptFlag = true;
        this.negativeFlag = false;
        this.overflowFlag = false;
        // Read the address of the first instruction.
        this.programCounter = this.memory.read(0xfffc);
        this.stackPointer = 0xff;
    }
}