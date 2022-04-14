import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20ContractStatsUpdated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20ContractStatsUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly holderCount: number;
  readonly operationCount: number;
  readonly mintCount: number;
  readonly transferCount: number;
}
