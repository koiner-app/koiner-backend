export class CreateContractOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly entryPoint: number,
    public readonly args: string,
  ) {}
}
