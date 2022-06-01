import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenTokensMinted extends DomainEvent {
  constructor(props: DomainEventProps<TokenTokensMinted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly to!: string;
  readonly value!: number;
}
