export class Krc20BalanceCreated {
  constructor(
    public readonly addressId: string,
    public readonly balance: number,
  ) {}
}
