export class TransactionCreatedMessage {
  static routingKey = 'chain.transaction.created';

  constructor(props: Partial<TransactionCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly blockHeight!: number;
  readonly payer!: string;
  readonly operationCount!: number;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
