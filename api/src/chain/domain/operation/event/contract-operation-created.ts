export class ContractOperationCreated {
  constructor(
    public readonly operationId: string,
    public readonly contractId: string,
    public readonly entryPoint: number,
    public readonly args: string,
    public readonly contractStandardType?: string,
  ) {}
}
