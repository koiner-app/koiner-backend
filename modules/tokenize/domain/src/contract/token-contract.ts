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
      totalSupply: create.totalSupply ?? 0,
      mintCount: create.mintCount ?? 0,
      burnCount: create.burnCount ?? 0,
      transferCount: create.transferCount ?? 0,
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

  get burnCount(): number {
    return this.props.burnCount;
  }

  get mintCount(): number {
    return this.props.mintCount;
  }

  get transferCount(): number {
    return this.props.transferCount;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  update(props: UpdateTokenContractProps): void {
    this.props.mintCount += props.mintCount ?? 0;
    this.props.burnCount += props.burnCount ?? 0;
    this.props.transferCount += props.transferCount ?? 0;

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
