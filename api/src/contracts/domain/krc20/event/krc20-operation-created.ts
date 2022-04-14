import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20OperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20OperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly name: string;
  readonly to: string;
  readonly value: number;
  readonly from?: string;
}
