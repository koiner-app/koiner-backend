import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenContractsFilter, TokenContractsSortInput } from '.';
import { TokenContractsSortFieldEnum } from './token-contracts.sort-field.enum';

@ArgsType()
export class TokenContractsRequest extends SearchRequestArgs {
  @Field(() => TokenContractsFilter, { nullable: true })
  filter?: TokenContractsFilter;

  @Optional()
  @Field(() => [TokenContractsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenContractsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as TokenContractsSortInput,
    ],
  })
  sort?: TokenContractsSortInput[];
}
