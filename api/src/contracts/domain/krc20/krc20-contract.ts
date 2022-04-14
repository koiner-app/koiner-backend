import { AggregateRoot } from '@appvise/domain';
import {
  Krc20ContractCreated,
  Krc20ContractStatsUpdated,
  Krc20ContractTotalSupplyUpdated,
} from '@koiner/contracts/domain';
import {
  Krc20ContractProps,
  CreateKrc20ContractProps,
} from './krc20-contract.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  Krc20ContractStatistics,
  UpdateKrc20ContractStatisticsProps,
} from './krc20-contract-statistics';

export class Krc20Contract extends AggregateRoot<Krc20ContractProps> {
  protected readonly _id: KoinosId;

  static create(
    create: CreateKrc20ContractProps,
    id: KoinosAddressId,
  ): Krc20Contract {
    const props: Krc20ContractProps = {
      ...create,
      totalSupply: 0,
      stats: Krc20ContractStatistics.create(),
    };

    const contract = new Krc20Contract({ id, props });

    contract.addEvent(
      new Krc20ContractCreated({
        aggregateId: id.value,
        name: props.name,
        symbol: props.symbol,
        decimals: props.decimals,
        totalSupply: props.totalSupply,
      }),
    );

    return contract;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get operationIndex(): number {
    return this.props.operationIndex;
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

  get stats(): Krc20ContractStatistics {
    return this.props.stats;
  }

  updateTotalSupply(mintedTokens: number): void {
    this.props.totalSupply += mintedTokens;

    this.addEvent(
      new Krc20ContractTotalSupplyUpdated({
        aggregateId: this.id.value,
        totalSupply: this.props.totalSupply,
        mintedTokens,
      }),
    );
  }

  updateStats(props: UpdateKrc20ContractStatisticsProps): void {
    this.props.stats.update(props);

    this.addEvent(
      new Krc20ContractStatsUpdated({
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
