import { AggregateRoot } from '@appvise/domain';
import { ChainId } from '@koiner/domain';
import { StopSignalProps, CreateStopSignalProps, StopSignaled } from '.';

export class StopSignal extends AggregateRoot<StopSignalProps> {
  protected readonly _id!: ChainId;

  static create(create: CreateStopSignalProps, id: ChainId): StopSignal {
    const props: StopSignalProps = {
      ...create,
    };

    const synchronization = new StopSignal({ id, props });

    synchronization.addEvent(
      new StopSignaled({
        aggregateId: id.value,
        stopAtHeight: props.stopAtHeight,
      })
    );

    return synchronization;
  }

  get stopAtHeight(): number {
    return this.props.stopAtHeight;
  }

  validate(): void {
    //
  }
}
