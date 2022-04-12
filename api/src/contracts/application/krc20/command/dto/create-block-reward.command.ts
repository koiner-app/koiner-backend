export class CreateBlockRewardCommand {
  constructor(
    public readonly blockHeight: number,
    public readonly producerId: string,
    public readonly value: number,
    public readonly contractId: string,
  ) {}
}
