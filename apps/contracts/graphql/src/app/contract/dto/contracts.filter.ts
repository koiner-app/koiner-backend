import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class ContractsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => [ContractsFilter], {
    nullable: true,
  })
  AND?: ContractsFilter[];

  @Field(() => [ContractsFilter], {
    nullable: true,
  })
  OR?: ContractsFilter[];
}
