import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenOperationsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  operation?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  from?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  to?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  value?: StringFilterInput;

  @Field(() => [TokenOperationsFilter], {
    nullable: true,
  })
  AND?: TokenOperationsFilter[];

  @Field(() => [TokenOperationsFilter], {
    nullable: true,
  })
  OR?: TokenOperationsFilter[];
}
