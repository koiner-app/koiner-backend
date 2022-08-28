import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokensTransferred extends DomainEvent {
  constructor(props: DomainEventProps<TokensTransferred>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly from!: string;
  readonly to!: string;
  readonly value!: number;
}
