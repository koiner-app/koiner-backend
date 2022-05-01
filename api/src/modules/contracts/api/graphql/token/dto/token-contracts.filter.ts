import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenContractsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  symbol?: StringFilterInput;

  @Field(() => [TokenContractsFilter], {
    nullable: true,
  })
  AND?: TokenContractsFilter[];

  @Field(() => [TokenContractsFilter], {
    nullable: true,
  })
  OR?: TokenContractsFilter[];
}
