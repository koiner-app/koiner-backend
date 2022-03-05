export class ContractCreated {
  constructor(
    public readonly contractId: string,
    public readonly blockHeight: number,
    public readonly transactionId: string,
    public readonly operationIndex: number,
  ) {}
}
