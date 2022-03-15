import { CreateOperationProps } from '@koiner/chain/domain/operation/operation.types';

export class CreateTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly blockHeight: number,
    public readonly rcLimit: string,
    public readonly payer: string,
    public readonly signature: string,
    // TODO: Not depend on domain props here?
    public readonly operations: CreateOperationProps[],
    public readonly transactionIndex: number,
    public readonly nonce?: string,
    public readonly operationMerkleRoot?: string,
  ) {}
}
