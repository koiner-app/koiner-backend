import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BlockHeader } from '@koiner/chain/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockHeader')
export class BlockHeaderField {
  @Field()
  previous: string;

  @Field(() => GraphQLBigInt)
  height: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  @Field({ nullable: true })
  previousStateMerkleRoot: string;

  @Field({ nullable: true })
  transactionMerkleRoot: string;

  @Field()
  signer: string;

  constructor(block: BlockHeader) {
    this.height = block.height;
    this.timestamp = block.timestamp;
    this.previous = block.previous;
    this.previousStateMerkleRoot = block.previousStateMerkleRoot;
    this.transactionMerkleRoot = block.transactionMerkleRoot;
    this.signer = block.signer;
  }
}
