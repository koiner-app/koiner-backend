import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenHoldersFilter, TokenHoldersSortInput } from '.';
import { TokenHoldersSortFieldEnum } from './token-holders.sort-field.enum';

@ArgsType()
export class TokenHoldersRequest extends SearchRequestArgs {
  @Field(() => TokenHoldersFilter, { nullable: true })
  filter?: TokenHoldersFilter;

  @Optional()
  @Field(() => [TokenHoldersSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenHoldersSortFieldEnum.balance,
        direction: SortDirection.desc,
      } as TokenHoldersSortInput,
    ],
  })
  sort?: TokenHoldersSortInput[];
}
