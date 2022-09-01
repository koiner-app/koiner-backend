import { AggregateRoot } from '@appvise/domain';
import { BlockTopology } from '@koiner/domain';
import {
  ChainCreated,
  ChainId,
  ChainProps,
  ChainUpdated,
  CreateChainProps,
  InitialChainSyncCompleted,
  UpdateChainProps,
} from '.';

export class Chain extends AggregateRoot<ChainProps> {
  protected readonly _id!: ChainId;

  static create(create: CreateChainProps, id: ChainId): Chain {
    const props: ChainProps = {
      ...create,
      stopped: false,
      initialSyncCompleted: false,
    };

    const chain = new Chain({ id, props });

    chain.addEvent(
      new ChainCreated({
        aggregateId: id.value,
        initialSyncEndBlock: props.initialSyncEndBlock,
      })
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

  get initialSyncEndBlock(): number {
    return this.props.initialSyncEndBlock;
  }

  get initialSyncCompleted(): boolean {
    return this.props.initialSyncCompleted;
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
      })
    );
  }

  completeInitialSync(): void {
    this.props.initialSyncCompleted = true;

    this.addEvent(
      new InitialChainSyncCompleted({
        aggregateId: this._id.value,
        endBlock: this.initialSyncEndBlock,
      })
    );
  }

  validate(): void {
    //
  }
}
