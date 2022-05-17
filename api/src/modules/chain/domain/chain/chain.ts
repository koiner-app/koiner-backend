import { AggregateRoot } from '@appvise/domain';
import { ChainCreated, ChainId, UpdateChainProps } from '@koiner/chain/domain';
import { BlockTopology } from '@koiner/domain';
import { ChainProps, CreateChainProps, ChainUpdated } from '.';

export class Chain extends AggregateRoot<ChainProps> {
  protected readonly _id: ChainId;

  static create(create: CreateChainProps, id: ChainId): Chain {
    const props: ChainProps = {
      ...create,
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

  validate(): void {
    //
  }
}
