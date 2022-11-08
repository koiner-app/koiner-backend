export class BlockRewardCreatedMessage {
  static eventName = 'network.block-reward.created';

  constructor(props: Partial<BlockRewardCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly blockHeight!: number;
  readonly producerId!: string;
  readonly value!: number;
  readonly mintedValue!: number;
  readonly burnedValue!: number;
  readonly contractId!: string;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
