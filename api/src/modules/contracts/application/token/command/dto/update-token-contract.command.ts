export class UpdateTokenContractCommand {
  constructor(
    public readonly contractId: string,
    public readonly mintedTokens?: number,
    public readonly stats?: {
      holderCount?: number;
      operationCount?: number;
      mintCount?: number;
      transferCount?: number;
    },
  ) {}
}
