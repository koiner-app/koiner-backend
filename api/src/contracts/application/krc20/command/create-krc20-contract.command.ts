export class CreateKrc20ContractCommand {
  constructor(
    public readonly id: string,
    public readonly blockHeight: number,
    public readonly transactionId: string,
    public readonly operationIndex: number,
    public readonly name: string,
    public readonly symbol: string,
    public readonly decimals: number,
  ) {}
}
