export class CreateContractCommand {
  constructor(
    public readonly id: string,
    public readonly blockHeight: number,
    public readonly transactionId: string,
    public readonly operationIndex: number,
    public readonly bytecode: string,
    public readonly abi?: string,
  ) {}
}
