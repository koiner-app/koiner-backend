export class CreateTokenOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly name: string,
    public readonly to: string,
    public readonly value: number,
    public readonly from?: string,
    public readonly transactionId?: string,
  ) {}
}
