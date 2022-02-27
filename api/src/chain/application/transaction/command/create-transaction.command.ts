export class CreateTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly blockHeight: number,
    public readonly rcLimit: string,
    public readonly signer: string,
    public readonly signature: string,
    public readonly operationCount: number,
    public readonly transactionIndex: number,
    public readonly nonce?: string,
    public readonly operationMerkleRoot?: string,
  ) {}
}
