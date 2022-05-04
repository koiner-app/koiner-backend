export class CreateContractCommand {
  constructor(
    public readonly id: string,
    public readonly bytecode: string,
    public readonly abi?: string,
    public readonly contractStandardType?: string,
  ) {}
}
