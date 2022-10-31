export class UploadContractOperationCreatedMessage {
  static eventName = 'chain.upload-contract-operation.created';

  constructor(props: Partial<UploadContractOperationCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly bytecode!: string;
  readonly abi?: string;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
