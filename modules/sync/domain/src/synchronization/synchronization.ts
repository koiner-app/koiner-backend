import { AggregateRoot, ConflictException } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import {
  CompleteBatchProps,
  CreateSynchronizationProps,
  MarkBatchAsFailedProps,
  StartNextBatchProps,
  SynchronizationBatchCompleted,
  SynchronizationBatchFailed,
  SynchronizationBatchStarted,
  SynchronizationProps,
  SynchronizationCreated,
  SynchronizationResumed,
  SynchronizationStopped,
  SynchronizationTimedOut,
} from '.';

export class Synchronization extends AggregateRoot<SynchronizationProps> {
  protected readonly _id!: ChainId;

  static create(
    create: CreateSynchronizationProps,
    id: ChainId
  ): Synchronization {
    const props: SynchronizationProps = {
      ...create,
      lastSyncedBlock: 0,
      syncing: false,
      stopped: false,
    };

    const synchronization = new Synchronization({ id, props });

    synchronization.addEvent(
      new SynchronizationCreated({
        aggregateId: id.value,
        headTopologyHeight: props.headTopologyHeight,
        lastIrreversibleBlock: props.lastIrreversibleBlock,
      })
    );

    return synchronization;
  }

  get headTopologyHeight(): number {
    return this.props.headTopologyHeight;
  }

  get lastIrreversibleBlock(): number {
    return this.props.lastIrreversibleBlock;
  }

  get batchStartedAt(): number | undefined {
    return this.props.batchStartedAt;
  }

  get batchStartHeight(): number | undefined {
    return this.props.batchStartHeight;
  }

  get batchEndHeight(): number | undefined {
    return this.props.batchEndHeight;
  }

  get lastSyncedBlock(): number {
    return this.props.lastSyncedBlock;
  }

  get lastError(): string | undefined {
    return this.props.lastError;
  }

  get syncing(): boolean {
    return this.props.syncing;
  }

  get stopped(): boolean {
    return this.props.stopped;
  }

  get stoppedAt(): number | undefined {
    return this.props.stoppedAt;
  }

  startNextBatch(props: StartNextBatchProps): void {
    this.props.headTopologyHeight = props.headTopologyHeight;
    this.props.lastIrreversibleBlock = props.lastIrreversibleBlock;

    this.props.syncing = true;
    this.props.batchStartedAt = Date.now();
    this.props.batchStartHeight = props.startHeight;
    this.props.batchEndHeight = props.endHeight;

    this.addEvent(
      new SynchronizationBatchStarted({
        aggregateId: this._id.value,
        headTopologyHeight: props.headTopologyHeight,
        lastIrreversibleBlock: props.lastIrreversibleBlock,
        lastSyncedBlock: this.lastSyncedBlock,
        startHeight: props.startHeight,
        endHeight: props.endHeight,
        batchSize: props.endHeight - props.startHeight + 1,
      })
    );
  }

  completeBatch(props: CompleteBatchProps): void {
    if (
      !this.batchStartedAt ||
      !this.batchStartHeight ||
      !this.batchEndHeight
    ) {
      // TODO: Throw custom domain exception
      throw new ConflictException('No batch to complete');
    }

    // Create event before resetting props
    const event = new SynchronizationBatchCompleted({
      aggregateId: this._id.value,
      headTopologyHeight: props.headTopologyHeight,
      lastIrreversibleBlock: props.lastIrreversibleBlock,
      lastSyncedBlock: this.lastSyncedBlock,
      startHeight: this.batchStartHeight,
      endHeight: this.batchEndHeight,
      batchSize: this.batchEndHeight - this.batchStartHeight + 1,
    });

    this.props.headTopologyHeight = props.headTopologyHeight;
    this.props.lastIrreversibleBlock = props.lastIrreversibleBlock;
    this.props.lastSyncedBlock = props.lastSyncedBlock;

    // Reset sync
    this.reset();

    this.addEvent(event);
  }

  markBatchAsFailed(props: MarkBatchAsFailedProps): void {
    if (
      !this.batchStartedAt ||
      !this.batchStartHeight ||
      !this.batchEndHeight
    ) {
      // TODO: Throw custom domain exception
      throw new ConflictException('No batch to mark as failed');
    }

    this.props.headTopologyHeight = props.headTopologyHeight;
    this.props.lastIrreversibleBlock = props.lastIrreversibleBlock;
    this.props.lastSyncedBlock = props.failedAtBlock - 1;

    // Create event before resetting props
    const event = new SynchronizationBatchFailed({
      aggregateId: this._id.value,
      headTopologyHeight: props.headTopologyHeight,
      lastIrreversibleBlock: props.lastIrreversibleBlock,
      lastSyncedBlock: this.lastSyncedBlock,
      startHeight: this.batchStartHeight,
      endHeight: this.batchEndHeight,
      batchSize: this.batchEndHeight - this.batchStartHeight + 1,
      failedAtBlock: props.failedAtBlock,
      error: props.error,
    });

    this.stop();

    this.props.lastError = props.error;

    this.addEvent(event);
  }

  stop(): void {
    const stoppedAt = Date.now();

    this.reset();

    this.props.stopped = true;
    this.props.stoppedAt = stoppedAt;

    this.addEvent(
      new SynchronizationStopped({
        aggregateId: this._id.value,
        headTopologyHeight: this.headTopologyHeight,
        lastIrreversibleBlock: this.lastIrreversibleBlock,
        lastSyncedBlock: this.lastSyncedBlock,
        stoppedAt,
      })
    );
  }

  resume(): void {
    this.reset();

    this.addEvent(
      new SynchronizationResumed({
        aggregateId: this._id.value,
        headTopologyHeight: this.headTopologyHeight,
        lastIrreversibleBlock: this.lastIrreversibleBlock,
        lastSyncedBlock: this.lastSyncedBlock,
      })
    );
  }

  timedOut(): void {
    this.stop();

    this.addEvent(
      new SynchronizationTimedOut({
        aggregateId: this._id.value,
        headTopologyHeight: this.headTopologyHeight,
        lastIrreversibleBlock: this.lastIrreversibleBlock,
        lastSyncedBlock: this.lastSyncedBlock,
        timedOutAt: Date.now(),
      })
    );
  }

  private reset(): void {
    this.props.syncing = false;
    this.props.batchStartedAt = undefined;
    this.props.batchStartHeight = undefined;
    this.props.batchEndHeight = undefined;
    this.props.stopped = false;
    this.props.stoppedAt = undefined;
    this.props.lastError = undefined;
  }

  validate(): void {
    //
  }
}
