export class AddressCreatedMessage {
  static eventName = 'chain.address.created';

  constructor(props: Partial<AddressCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly isProducer!: boolean;
  readonly isContract!: boolean;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
