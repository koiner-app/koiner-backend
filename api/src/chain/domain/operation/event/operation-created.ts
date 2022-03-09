export class OperationCreated {
  constructor(
    public readonly operationId: string,
    public readonly contractId: string,
    public readonly blockHeight: number,
    public readonly transactionId: string,
    public readonly operationIndex: number,
  ) {}
}
