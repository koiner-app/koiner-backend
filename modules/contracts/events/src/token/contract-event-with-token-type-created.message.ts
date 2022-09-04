import { ContractEventCreatedMessage } from '@koiner/contracts/events';

export class ContractEventWithTokenTypeCreatedMessage extends ContractEventCreatedMessage {
  static override routingKey = 'contracts.contract.type_token.event.created';

  constructor(props: Partial<ContractEventWithTokenTypeCreatedMessage>) {
    super(props);
    Object.assign(this, props);
  }

  override readonly contractStandardType: string = 'token';
}
