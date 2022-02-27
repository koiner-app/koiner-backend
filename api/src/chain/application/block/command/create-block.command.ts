export class CreateBlockCommand {
  constructor(
    public readonly id: string,
    public readonly previous: string,
    public readonly height: number,
    public readonly timestamp: number,
    public readonly previousStateMerkleRoot: string,
    public readonly transactionMerkleRoot: string,
    public readonly signer: string,
    public readonly signature: string,
    public readonly transactionCount: number,
  ) {}
}
