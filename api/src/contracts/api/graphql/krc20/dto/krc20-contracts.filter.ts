import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class Krc20ContractsFilter implements FilterType {
  @Field((type) => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  symbol?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  blockHeight?: StringFilterInput;

  @Field((type) => [Krc20ContractsFilter], {
    nullable: true,
  })
  AND?: Krc20ContractsFilter[];

  @Field((type) => [Krc20ContractsFilter], {
    nullable: true,
  })
  OR?: Krc20ContractsFilter[];
}
