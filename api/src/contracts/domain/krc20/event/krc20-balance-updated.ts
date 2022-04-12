export class Krc20BalanceUpdated {
  constructor(
    public readonly addressId: string,
    public readonly balance: number,
    public readonly amountChanged: number,
  ) {}
}
