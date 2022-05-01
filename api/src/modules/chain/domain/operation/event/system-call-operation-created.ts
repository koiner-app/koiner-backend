import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SystemCallOperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<SystemCallOperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly callId: number;
}
