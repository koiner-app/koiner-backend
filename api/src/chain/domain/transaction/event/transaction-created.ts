export class TransactionCreated {
  constructor(
    public readonly transactionId: string,
    public readonly payer: string,
  ) {}
}
