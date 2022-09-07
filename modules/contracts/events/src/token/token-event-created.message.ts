export class TokenEventCreatedMessage {
  static routingKey = 'contracts.token.event.created';

  constructor(props: Partial<TokenEventCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly name!: string;
  readonly from?: string;
  readonly to?: string;
  readonly value!: number;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
