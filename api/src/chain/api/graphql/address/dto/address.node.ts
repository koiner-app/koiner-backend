import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from '@koiner/chain/domain';
import { BaseNode } from '@appvise/graphql';
import { AddressStatisticsField } from './address-statistics.field';
import { TransactionsConnection } from '@koiner/chain/api/graphql/transaction/dto/transactions.connection';

@ObjectType('Address')
export class AddressNode extends BaseNode {
  @Field((type) => AddressStatisticsField)
  stats: AddressStatisticsField;

  @Field((type) => TransactionsConnection)
  transactions: TransactionsConnection;

  constructor(entity: Address) {
    super(entity);

    this.stats = new AddressStatisticsField(entity.stats);
  }
}
