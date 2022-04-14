import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20TokensMinted extends DomainEvent {
  constructor(props: DomainEventProps<Krc20TokensMinted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly to: string;
  readonly value: number;
}
