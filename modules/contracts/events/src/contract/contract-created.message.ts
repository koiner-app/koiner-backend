export class ContractCreatedMessage {
  static eventName = 'contracts.contract.created';

  constructor(props: Partial<ContractCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly contractStandardType?: string;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
