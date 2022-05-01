import { Field, ObjectType } from '@nestjs/graphql';
import { BlockHeader } from '@koiner/chain/domain';

@ObjectType('BlockHeader')
export class BlockHeaderField {
  @Field()
  previous: string;

  @Field()
  height: number;

  @Field()
  timestamp: number;

  @Field({ nullable: true })
  previousStateMerkleRoot: string;

  @Field({ nullable: true })
  transactionMerkleRoot: string;

  @Field()
  signer: string;

  constructor(entity: BlockHeader) {
    this.height = entity.height;
    this.timestamp = entity.timestamp;
    this.previous = entity.previous;
    this.previousStateMerkleRoot = entity.previousStateMerkleRoot;
    this.transactionMerkleRoot = entity.transactionMerkleRoot;
    this.signer = entity.signer;
  }
}
