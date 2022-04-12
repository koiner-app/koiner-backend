export class UpdateKrc20BalanceCommand {
  constructor(
    public readonly addressId: string,
    public readonly contractId: string,
    public readonly amountChanged: number,
  ) {}
}
