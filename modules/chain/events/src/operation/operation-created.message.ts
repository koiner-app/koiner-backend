export class OperationCreatedMessage {
  static eventName = 'chain.operation.created';

  constructor(props: Partial<OperationCreatedMessage>) {
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
