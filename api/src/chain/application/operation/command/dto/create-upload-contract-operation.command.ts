export class CreateUploadContractOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly bytecode: string,
    public readonly abi?: string,
    public readonly contractStandardType?: string,
  ) {}
}
