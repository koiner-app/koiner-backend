import { ContractOperationCreatedMessage } from '@koiner/contracts/events';

export class ContractOperationWithTokenTypeCreatedMessage extends ContractOperationCreatedMessage {
  static override routingKey =
    'contracts.contract.type_token.operation.created';

  constructor(props: Partial<ContractOperationWithTokenTypeCreatedMessage>) {
    super(props);
    Object.assign(this, props);
  }

  override readonly contractStandardType: string = 'token';
}
