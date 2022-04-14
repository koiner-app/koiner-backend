import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20TokensTransferred extends DomainEvent {
  constructor(props: DomainEventProps<Krc20TokensTransferred>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly to: string;
  readonly value: number;
  readonly from?: string;
}
