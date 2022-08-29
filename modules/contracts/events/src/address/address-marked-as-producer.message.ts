export class AddressMarkedAsProducerMessage {
  static routingKey = 'contracts.address.markedAsProducer';

  constructor(props: Partial<AddressMarkedAsProducerMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;

  public toString(): string {
    return JSON.stringify(this);
  }
}