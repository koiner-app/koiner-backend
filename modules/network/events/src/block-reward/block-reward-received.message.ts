export class BlockRewardReceivedMessage {
  static eventName = 'network.block-rewards-received';

  constructor(props: Partial<BlockRewardReceivedMessage>) {
    Object.assign(this, props);
  }

  readonly isNewProducer!: boolean;
  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly rewardsReceived!: number;
  readonly mintedValue!: number;
  readonly burnedValue!: number;
  readonly mintedTotal!: number;
  readonly burnedTotal!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
