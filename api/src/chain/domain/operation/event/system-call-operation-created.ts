import { OperationCreated } from '@koiner/chain/domain';

export class SystemCallOperationCreated {
  public readonly operationId: string;
  public readonly contractId: string;
  public readonly blockHeight: number;
  public readonly transactionId: string;
  public readonly operationIndex: number;

  constructor(event: OperationCreated) {
    this.operationId = event.operationId;
  }
}
