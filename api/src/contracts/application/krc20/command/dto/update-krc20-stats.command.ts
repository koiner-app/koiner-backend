export class UpdateKrc20ContractStatsCommand {
  constructor(
    public readonly contractId: string,
    public readonly stats: {
      holderCount?: number;
      operationCount?: number;
      mintCount?: number;
      transferCount?: number;
    },
  ) {}
}
