export class CreateKrc20OperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly name: string,
    public readonly to: string,
    public readonly value: number,
    public readonly from?: string,
  ) {}
}
