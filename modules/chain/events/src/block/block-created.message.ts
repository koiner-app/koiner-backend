export class BlockCreatedMessage {
  static eventName = 'chain.block.created';

  constructor(props: Partial<BlockCreatedMessage>) {
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
