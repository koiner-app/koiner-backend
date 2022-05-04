import { AggregateRoot } from '@appvise/domain';
import {
  TokenContractCreated,
  TokenContractStatsUpdated,
  TokenContractTotalSupplyUpdated,
  UpdateTokenContractProps,
} from '@koiner/contracts/domain';
import {
  TokenContractProps,
  CreateTokenContractProps,
} from './token-contract.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  TokenContractStatistics,
  UpdateTokenContractStatisticsProps,
} from './token-contract-statistics';

export class TokenContract extends AggregateRoot<TokenContractProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateTokenContractProps,
    id: KoinosAddressId,
  ): TokenContract {
    const props: TokenContractProps = {
      ...create,
      totalSupply: 0,
      stats: TokenContractStatistics.create(),
    };

    const contract = new TokenContract({ id, props });

    contract.addEvent(
      new TokenContractCreated({
        aggregateId: id.value,
        name: props.name,
        symbol: props.symbol,
        decimals: props.decimals,
        totalSupply: props.totalSupply,
      }),
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

  get stats(): TokenContractStatistics {
    return this.props.stats;
  }

  update(props: UpdateTokenContractProps): void {
    if (props.mintedTokens) {
      this.updateTotalSupply(props.mintedTokens);
    }

    if (props.stats) {
      this.updateStats(props.stats);
    }
  }

  updateTotalSupply(mintedTokens: number): void {
    this.props.totalSupply += mintedTokens;

    this.addEvent(
      new TokenContractTotalSupplyUpdated({
        aggregateId: this.id.value,
        totalSupply: this.props.totalSupply,
        mintedTokens,
      }),
    );
  }

  updateStats(props: UpdateTokenContractStatisticsProps): void {
    this.props.stats.update(props);

    this.addEvent(
      new TokenContractStatsUpdated({
        aggregateId: this.id.value,
        holderCount: this.props.stats.holderCount,
        operationCount: this.props.stats.operationCount,
        mintCount: this.props.stats.mintCount,
        transferCount: this.props.stats.transferCount,
      }),
    );
  }

  validate(): void {
    // TODO: Add validations
  }
}
