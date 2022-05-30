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

  constructor(transactionHeader: TransactionHeader) {
    this.rcLimit = transactionHeader.rcLimit;
    this.nonce = transactionHeader.nonce;
    this.operationMerkleRoot = transactionHeader.operationMerkleRoot;
    this.payer = transactionHeader.payer;
  }
}
