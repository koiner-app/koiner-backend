import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProductionStatsProps,
  BlockProductionStatsUpdated,
  CreateBlockProductionStatsProps,
} from '.';
import * as math from 'mathjs';

export class BlockProductionStats extends AggregateRoot<BlockProductionStatsProps> {
  protected readonly _id!: KoinosAddressId;

  static create(
    create: CreateBlockProductionStatsProps,
    id: UUID
  ): BlockProductionStats {
    const props: BlockProductionStatsProps = {
      ...create,
      roi: math
        .chain<number>(create.rewarded)
        .divide(create.burned)
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
        burned: props.burned,
        rewardsAdded: props.rewarded,
        burnedAdded: props.burned,
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

  get burned(): number {
    return this.props.burned;
  }

  get roi(): number {
    return this.props.roi;
  }

  get blocksProduced(): number {
    return this.props.blocksProduced;
  }

  addRewards(rewarded: number, burnedValue: number): void {
    if (rewarded < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.rewarded += rewarded;
    this.props.burned += burnedValue;
    this.props.blocksProduced += 1;
    this.props.roi = math
      .chain<number>(this.rewarded)
      .divide(this.burned)
      .multiply(100)
      .subtract(100)
      .round(5)
      .done() as number;

    this.addEvent(
      new BlockProductionStatsUpdated({
        aggregateId: this.id.value,
        contractId: this.props.contractId.value,
        rewarded: this.props.rewarded,
        burned: this.props.burned,
        rewardsAdded: rewarded,
        burnedAdded: burnedValue,
        blocksProduced: this.props.blocksProduced,
      })
    );
  }

  undoRewards(rewarded: number, burnedValue: number): void {
    this.props.rewarded -= rewarded;
    this.props.burned -= burnedValue;
    this.props.blocksProduced -= 1;
  }

  validate(): void {
    //
  }
}
