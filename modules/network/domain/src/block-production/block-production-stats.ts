import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProductionStatsProps,
  BlockProductionStatsUpdated,
  CreateBlockProductionStatsProps,
} from '.';
import * as math from 'mathjs';

export class BlockProductionStats extends AggregateRoot<BlockProductionStatsProps> {
  protected readonly _id!: UUID;

  static create(
    create: CreateBlockProductionStatsProps,
    id: UUID
  ): BlockProductionStats {
    const rewarded = create.mintedTotal - create.burnedTotal;

    const props: BlockProductionStatsProps = {
      ...create,
      rewarded,
      roi: math
        .chain<number>(create.mintedTotal)
        .divide(create.burnedTotal)
        .multiply(100)
        .subtract(100)
        .round(5)
        .done() as number,
      blocksProduced: 1,
    };

    const blockProductionStats = new BlockProductionStats({ id, props });

    blockProductionStats.addEvent(
      new BlockProductionStatsUpdated({
        aggregateId: id.value,
        contractId: props.contractId.value,
        rewarded: props.rewarded,
        mintedTotal: props.mintedTotal,
        burnedTotal: props.burnedTotal,
        rewardsAdded: props.rewarded,
        mintedAdded: props.mintedTotal,
        burnedAdded: props.burnedTotal,
        blocksProduced: props.blocksProduced,
      })
    );

    return blockProductionStats;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get rewarded(): number {
    return this.props.rewarded;
  }

  get mintedTotal(): number {
    return this.props.mintedTotal;
  }

  get burnedTotal(): number {
    return this.props.burnedTotal;
  }

  get roi(): number {
    return this.props.roi;
  }

  get blocksProduced(): number {
    return this.props.blocksProduced;
  }

  addRewards(mintedValue: number, burnedValue: number): void {
    const rewarded = mintedValue - burnedValue;
    if (rewarded < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.rewarded += rewarded;
    this.props.mintedTotal += mintedValue;
    this.props.burnedTotal += burnedValue;
    this.props.blocksProduced += 1;
    this.props.roi = math
      .chain<number>(this.mintedTotal)
      .divide(this.burnedTotal)
      .multiply(100)
      .subtract(100)
      .round(5)
      .done() as number;

    this.addEvent(
      new BlockProductionStatsUpdated({
        aggregateId: this.id.value,
        contractId: this.props.contractId.value,
        rewarded: this.props.rewarded,
        mintedTotal: this.props.mintedTotal,
        burnedTotal: this.props.burnedTotal,
        rewardsAdded: rewarded,
        mintedAdded: mintedValue,
        burnedAdded: burnedValue,
        blocksProduced: this.props.blocksProduced,
      })
    );
  }

  undoRewards(mintedValue: number, burnedValue: number): void {
    this.props.rewarded -= mintedValue - burnedValue;
    this.props.mintedTotal -= mintedValue;
    this.props.burnedTotal -= burnedValue;
    this.props.blocksProduced -= 1;
  }

  validate(): void {
    //
  }
}
