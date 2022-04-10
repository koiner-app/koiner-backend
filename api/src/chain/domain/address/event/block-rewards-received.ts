export class BlockRewardsReceived {
  constructor(
    public readonly addressId: string,
    public readonly rewardsReceived: number,
    public readonly totalRewardsReceived: number,
  ) {}
}
