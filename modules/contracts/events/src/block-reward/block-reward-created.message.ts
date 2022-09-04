export class BlockRewardCreatedMessage {
  static routingKey = 'contracts.block-reward.created';

  constructor(props: Partial<BlockRewardCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly blockHeight!: number;
  readonly producerId!: string;
  readonly value!: number;
  readonly contractId!: string;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
