import { Field, ObjectType } from '@nestjs/graphql';
import { TransactionHeader } from '@koiner/chain/domain';

@ObjectType('TransactionHeader')
export class TransactionHeaderField {
  @Field()
  rcLimit: string;

  @Field({ nullable: true })
  nonce: string;

  @Field({ nullable: true })
  operationMerkleRoot: string;

  @Field()
  payer: string;

  constructor(entity: TransactionHeader) {
    this.rcLimit = entity.rcLimit;
    this.nonce = entity.nonce;
    this.operationMerkleRoot = entity.operationMerkleRoot;
    this.payer = entity.payer;
  }
}
