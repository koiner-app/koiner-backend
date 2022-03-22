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

export class Chain extends AggregateRoot<ChainProps> {
  protected readonly _id: ChainId;

  static create(create: CreateChainProps, id: ChainId): Chain {
    const props: ChainProps = {
      ...create,
      stats: ChainStatistics.create(),
    };

    const chain = new Chain({ id, props });

    chain.apply(new ChainCreated(id.value));

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

    // this.apply(new ChainUpdated(this._id.value));
  }

  updateStats(props: UpdateChainStatisticsProps): void {
    this.props.stats.update(props);
  }

  validate(): void {
    //
  }
}
