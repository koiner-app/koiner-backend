import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class InitialChainSyncCompleted extends DomainEvent {
  constructor(props: DomainEventProps<InitialChainSyncCompleted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly endBlock!: number;
}
