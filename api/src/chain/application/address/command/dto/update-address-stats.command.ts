export class UpdateAddressStatsCommand {
  constructor(
    public readonly addressId: string,
    public readonly stats: {
      contractCount?: number;
      operationCount?: number;
      transactionCount?: number;
    },
  ) {}
}
