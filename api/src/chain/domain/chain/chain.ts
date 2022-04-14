import { AggregateRoot } from '@appvise/domain';
import {
  ChainCreated,
  ChainId,
  ChainStatistics,
  UpdateChainProps,
} from '@koiner/chain/domain';
import { ChainProps, CreateChainProps } from './chain.types';
import { BlockTopology } from '@koiner/domain';
import { UpdateChainStatisticsProps } from '@koiner/chain/domain/chain/chain-statistics';
import { ChainUpdated } from '@koiner/chain/domain/chain/event/chain-updated';

export class Chain extends AggregateRoot<ChainProps> {
  protected readonly _id: ChainId;

  static create(create: CreateChainProps, id: ChainId): Chain {
    const props: ChainProps = {
      ...create,
      stats: ChainStatistics.create(),
      stopped: false,
    };

    const chain = new Chain({ id, props });

    chain.addEvent(
      new ChainCreated({
        aggregateId: id.value,
      }),
    );

    return chain;
  }

  get headTopology(): BlockTopology {
    return this.props.headTopology;
  }

  get lastIrreversibleBlock(): number {
    return this.props.lastIrreversibleBlock;
  }

  get lastSyncedBlock(): number {
    return this.props.lastSyncedBlock;
  }

  get syncing(): boolean {
    return this.props.syncing;
  }

  get stopped(): boolean {
    return this.props.stopped;
  }

  get stats(): ChainStatistics {
    return this.props.stats;
  }

  update(props: UpdateChainProps): void {
    this.props.headTopology = new BlockTopology({
      id: props.headTopology.id,
      previous: props.headTopology.previous,
      height: props.headTopology.height,
    });
    this.props.lastIrreversibleBlock = props.lastIrreversibleBlock;
    this.props.syncing = props.syncing;
    this.props.stopped = props.stopped;
    this.props.lastSyncedBlock = props.lastSyncedBlock;

    this.addEvent(
      new ChainUpdated({
        aggregateId: this._id.value,
        height: props.headTopology.height,
        previous: props.headTopology.previous,
        lastIrreversibleBlock: props.lastIrreversibleBlock,
        lastSyncedBlock: props.lastSyncedBlock,
      }),
    );
  }

  updateStats(props: UpdateChainStatisticsProps): void {
    this.props.stats.update(props);
  }

  validate(): void {
    //
  }
}
