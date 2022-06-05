export class AddressCreatedMessage {
  static routingKey = 'contracts.address.created';

  constructor(props: Partial<AddressCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly isProducer!: boolean;

  public toString(): string {
    return JSON.stringify(this);
  }
}
