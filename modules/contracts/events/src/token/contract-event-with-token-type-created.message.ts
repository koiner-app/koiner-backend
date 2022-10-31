import { ContractEventCreatedMessage } from '..';

export class ContractEventWithTokenTypeCreatedMessage extends ContractEventCreatedMessage {
  static override eventName = 'contracts.contract.type_token.event.created';

  constructor(props: Partial<ContractEventWithTokenTypeCreatedMessage>) {
    super(props);
    Object.assign(this, props);
  }

  override readonly contractStandardType: string = 'token';
}
