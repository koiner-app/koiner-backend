export class UpdateChainStatsCommand {
  constructor(
    public readonly chainId: string,
    public readonly stats: {
      addressCount?: number;
      contractCount?: number;
      operationCount?: number;
      transactionCount?: number;
    },
  ) {}
}
