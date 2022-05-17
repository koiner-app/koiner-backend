import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Address } from '@koiner/chain/domain';
import { TransactionsConnection } from '@koiner/chain/api/graphql';

@ObjectType('Address')
export class AddressNode extends BaseNode {
  @Field(() => TransactionsConnection)
  transactions: TransactionsConnection;

  constructor(entity: Address) {
    super(entity);
  }
}
