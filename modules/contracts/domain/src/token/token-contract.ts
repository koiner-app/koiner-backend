import { AggregateRoot } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  CreateTokenContractProps,
  TokenContractCreated,
  TokenTotalSupplyIncreased,
  TokenContractProps,
  UpdateTokenContractProps,
  TokenTotalSupplyDecreased,
} from '.';

export class TokenContract extends AggregateRoot<TokenContractProps> {
  protected readonly _id!: KoinosId;

  static create(
    create: CreateTokenContractProps,
    id: KoinosAddressId
  ): TokenContract {
    const props: TokenContractProps = {
      ...create,
      totalSupply: 0,
    };

    const contract = new TokenContract({ id, props });

    contract.addEvent(
      new TokenContractCreated({
        aggregateId: id.value,
        name: props.name,
        symbol: props.symbol,
        decimals: props.decimals,
        totalSupply: props.totalSupply,
        timestamp: props.timestamp,
      })
    );

    return contract;
  }

  get name(): string {
    return this.props.name;
  }

  get symbol(): string {
    return this.props.symbol;
  }

  get decimals(): number {
    return this.props.decimals;
  }

  get totalSupply(): number {
    return this.props.totalSupply;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  update(props: UpdateTokenContractProps): void {
    if (props.mintedTokens) {
      this.updateTotalSupply(props.mintedTokens);
    }

    if (props.burnedTokens) {
      this.updateTotalSupply(-props.burnedTokens);
    }
  }

  updateTotalSupply(amountChanged: number): void {
    this.props.totalSupply += amountChanged;

    if (amountChanged > 0) {
      this.addEvent(
        new TokenTotalSupplyIncreased({
          aggregateId: this.id.value,
          name: this.name,
          symbol: this.symbol,
          decimals: this.decimals,
          totalSupply: this.totalSupply,
          amountChanged,
        })
      );
    }

    if (amountChanged < 1) {
      this.addEvent(
        new TokenTotalSupplyDecreased({
          aggregateId: this.id.value,
          name: this.name,
          symbol: this.symbol,
          decimals: this.decimals,
          totalSupply: this.totalSupply,
          amountChanged,
        })
      );
    }
  }

  validate(): void {
    // TODO: Add validations
  }
}
