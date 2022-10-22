import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { TransactionHeader } from '@koiner/chain/domain';

@ObjectType('TransactionHeader')
export class TransactionHeaderField {
  @Field(() => GraphQLBigInt)
  rcLimit: number;

  @Field({ nullable: true })
  nonce: string;

  @Field({ nullable: true })
  operationMerkleRoot: string;

  @Field()
  payer: string;

  @Field({ nullable: true })
  payee?: string;

  constructor(transactionHeader: TransactionHeader) {
    this.rcLimit = transactionHeader.rcLimit;
    this.nonce = transactionHeader.nonce;
    this.operationMerkleRoot = transactionHeader.operationMerkleRoot;
    this.payer = transactionHeader.payer;
    this.payee = transactionHeader.payee;
  }
}
