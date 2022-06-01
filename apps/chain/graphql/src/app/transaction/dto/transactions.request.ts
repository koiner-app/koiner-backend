import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TransactionsFilter, TransactionsSortInput } from '.';
import { TransactionsSortFieldEnum } from './transactions.sort-field.enum';

@ArgsType()
export class TransactionsRequest extends SearchRequestArgs {
  @Field(() => TransactionsFilter, { nullable: true })
  filter?: TransactionsFilter;

  @Optional()
  @Field(() => [TransactionsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TransactionsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as TransactionsSortInput,
    ],
  })
  sort?: TransactionsSortInput[];
}
