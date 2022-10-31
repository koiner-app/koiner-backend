/**
 * Publish this message whenever a resource has used an address.
 * For example for new Contract.id, TokenEvent.from/to.
 * Chain sync will listen to this message for syncing addresses.
 */
export class AddressUsedMessage {
  static eventName = 'address.used';

  constructor(props: Partial<AddressUsedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly isProducer!: boolean;
  readonly isContract!: boolean;
  readonly isTokenContract!: boolean;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
