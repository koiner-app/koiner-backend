import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SystemContractOperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<SystemContractOperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly systemContract: boolean;
}
