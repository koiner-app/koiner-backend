export class BlockWithTransactionsCreatedMessage {
  static eventName = 'chain.block-with-transactions.created';

  constructor(props: Partial<BlockWithTransactionsCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly height!: number;
  readonly timestamp!: number;
  readonly transactionCount!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
