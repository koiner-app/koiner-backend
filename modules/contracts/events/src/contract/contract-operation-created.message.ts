export class ContractOperationCreatedMessage {
  static eventName = 'contracts.contract.operation.created';

  constructor(props: Partial<ContractOperationCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly operationId!: string;
  readonly blockHeight!: number;
  readonly contractId!: string;
  readonly transactionId!: string;
  readonly entryPoint!: number;
  readonly args!: string;
  readonly contractStandardType?: string;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
