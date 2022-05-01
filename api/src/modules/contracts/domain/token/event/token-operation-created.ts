import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenOperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<TokenOperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly name: string;
  readonly to: string;
  readonly value: number;
  readonly from?: string;
}
