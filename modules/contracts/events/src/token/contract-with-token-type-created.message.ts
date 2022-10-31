import { ContractCreatedMessage } from '@koiner/contracts/events';

export class ContractWithTokenTypeCreatedMessage extends ContractCreatedMessage {
  static override eventName = 'contracts.contract.type_token.contract.created';

  constructor(props: Partial<ContractWithTokenTypeCreatedMessage>) {
    super(props);
    Object.assign(this, props);
  }

  override readonly contractStandardType: string = 'token';
}
