export class Krc20OperationCreated {
  constructor(
    public readonly contractId: string,
    public readonly to: string,
    public readonly value: number,
    public readonly from?: string,
  ) {}
}
