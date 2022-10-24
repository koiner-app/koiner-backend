export class TokenContractCreatedMessage {
  static routingKey = 'tokenize.contract.created';

  constructor(props: Partial<TokenContractCreatedMessage>) {
    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly name!: string;
  readonly symbol!: string;
  readonly decimals!: number;
  readonly totalSupply!: number;
  readonly timestamp!: number;
  readonly publishedAt!: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
