export class UploadContractOperationCreatedMessage {
  static routingKey = 'chain.upload-contract-operation.created';

  constructor(props: Partial<UploadContractOperationCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly bytecode!: string;
  readonly abi?: string;
  readonly timestamp!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
