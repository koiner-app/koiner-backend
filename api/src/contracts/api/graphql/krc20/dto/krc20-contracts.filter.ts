import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class Krc20ContractsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  symbol?: StringFilterInput;

  @Field(() => [Krc20ContractsFilter], {
    nullable: true,
  })
  AND?: Krc20ContractsFilter[];

  @Field(() => [Krc20ContractsFilter], {
    nullable: true,
  })
  OR?: Krc20ContractsFilter[];
}
