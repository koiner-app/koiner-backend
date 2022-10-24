import { AggregateRoot } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import {
  ChainCreated,
  ChainStats,
  ChainProps,
  ChainUpdated,
  CreateChainProps,
  UpdateStatsProps,
} from '.';

export class Chain extends AggregateRoot<ChainProps> {
  protected readonly _id!: ChainId;

  static create(create: CreateChainProps, id: ChainId): Chain {
    const props: ChainProps = {
      ...create,
      timestamp: Date.now(),
    };

    const chain = new Chain({ id, props });

    chain.addEvent(
      new ChainCreated({
        aggregateId: id.value,
        stats: props.stats.unpack(),
        timestamp: props.timestamp,
      })
    );

    return chain;
  }

  get stats(): ChainStats {
    return this.props.stats;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  updateStats(stats: UpdateStatsProps): void {
    this.stats.update(stats);

    this.addEvent(
      new ChainUpdated({
        aggregateId: this.id.value,
        stats: this.stats.unpack(),
        timestamp: this.timestamp,
      })
    );
  }

  validate(): void {
    //
  }
}
