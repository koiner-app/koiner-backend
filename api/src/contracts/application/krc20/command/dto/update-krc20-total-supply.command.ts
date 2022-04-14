export class UpdateKrc20TotalSupplyCommand {
  constructor(
    public readonly contractId: string,
    public readonly mintedTokens: number,
  ) {}
}
