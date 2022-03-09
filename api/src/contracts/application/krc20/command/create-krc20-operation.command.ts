export class CreateKrc20OperationCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly from: string,
    public readonly to: string,
    public readonly value: string,
  ) {}
}
