import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenBalancesFilter, TokenBalancesSortInput } from '.';
import { TokenBalancesSortFieldEnum } from './token-balances.sort-field.enum';

@ArgsType()
export class TokenBalancesRequest extends SearchRequestArgs {
  @Field(() => TokenBalancesFilter, { nullable: true })
  filter?: TokenBalancesFilter;

  @Optional()
  @Field(() => [TokenBalancesSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenBalancesSortFieldEnum.balance,
        direction: SortDirection.desc,
      } as TokenBalancesSortInput,
    ],
  })
  sort?: TokenBalancesSortInput[];
}
