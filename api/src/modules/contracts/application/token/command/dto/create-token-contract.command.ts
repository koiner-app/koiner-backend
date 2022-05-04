export class CreateTokenContractCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly symbol: string,
    public readonly decimals: number,
  ) {}
}
