import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokensMinted extends DomainEvent {
  constructor(props: DomainEventProps<TokensMinted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly to!: string;
  readonly value!: number;
  readonly timestamp!: number;
}
