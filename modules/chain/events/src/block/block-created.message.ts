export class BlockCreatedMessage {
  static routingKey = 'chain.block.created';

  constructor(props: Partial<BlockCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly height!: number;
  readonly timestamp!: number;
  readonly transactionCount!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
