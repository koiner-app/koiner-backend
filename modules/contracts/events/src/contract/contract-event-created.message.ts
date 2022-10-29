export class ContractEventCreatedMessage {
  static routingKey = 'contracts.contract.event.created';

  constructor(props: Partial<ContractEventCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly eventId!: string;
  readonly blockHeight!: number;
  readonly parentId!: string;
  readonly parentType!: string;
  readonly sequence?: number;
  readonly contractId!: string;
  readonly contractStandardType?: string;
  readonly name!: string;
  readonly data?: string;
  readonly impacted?: string[];
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
