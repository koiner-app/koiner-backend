export class ContractOperationCreatedMessage {
  static routingKey = 'chain.contract-operation.created';

  constructor(props: Partial<ContractOperationCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly operationId!: string;
  readonly blockHeight!: number;
  readonly transactionId!: string;
  readonly operationIndex!: number;
  readonly type!: string;
  readonly timestamp!: number;
  readonly operationData!: Record<string, any>;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
