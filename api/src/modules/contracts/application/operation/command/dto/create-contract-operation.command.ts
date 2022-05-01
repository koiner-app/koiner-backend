export class CreateContractOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly transactionId: string,
    public readonly entryPoint: number,
    public readonly args: string,
    public readonly contractStandardType?: string,
  ) {}
}
