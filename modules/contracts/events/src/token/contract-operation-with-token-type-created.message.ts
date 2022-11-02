import { ContractOperationCreatedMessage } from '../contract/contract-operation-created.message';

export class ContractOperationWithTokenTypeCreatedMessage extends ContractOperationCreatedMessage {
  static override eventName = 'contracts.contract.type_token.operation.created';

  constructor(props: Partial<ContractOperationWithTokenTypeCreatedMessage>) {
    super(props);
    Object.assign(this, props);
  }

  override readonly contractStandardType: string = 'token';
}
