import { AggregateRoot, UUID } from '@appvise/domain';
import { BlockTopology } from '@koiner/domain';
import {
  SynchronizationProps,
  SynchronizationStarted,
  SynchronizationUpdated,
  CreateSynchronizationProps,
  UpdateSynchronizationProps,
  ChainId,
} from '.';

export class Synchronization extends AggregateRoot<SynchronizationProps> {
  protected readonly _id!: ChainId;

  static create(
    create: CreateSynchronizationProps,
    id: ChainId
  ): Synchronization {
    const props: SynchronizationProps = {
      ...create,
      stopped: false,
    };

    const synchronization = new Synchronization({ id, props });

    synchronization.addEvent(
      new SynchronizationStarted({
        aggregateId: id.value,
      })
    );

    return synchronization;
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

  update(props: UpdateSynchronizationProps): void {
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
      new SynchronizationUpdated({
        aggregateId: this._id.value,
        height: props.headTopology.height,
        previous: props.headTopology.previous,
        lastIrreversibleBlock: props.lastIrreversibleBlock,
        lastSyncedBlock: props.lastSyncedBlock,
      })
    );
  }

  validate(): void {
    //
  }
}
