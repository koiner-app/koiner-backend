import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenTokensTransferred extends DomainEvent {
  constructor(props: DomainEventProps<TokenTokensTransferred>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly to!: string;
  readonly value!: number;
  readonly from?: string;
}
