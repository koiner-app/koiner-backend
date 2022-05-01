export class CreateTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly blockHeight: number,
    public readonly rcLimit: string,
    public readonly payer: string,
    public readonly signature: string,
    public readonly transactionIndex: number,
    public readonly operationCount: number,
    public readonly nonce?: string,
    public readonly operationMerkleRoot?: string,
  ) {}
}
