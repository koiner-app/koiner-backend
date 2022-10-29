import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenEventsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentType?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  from?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  to?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  value?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => [TokenEventsFilter], {
    nullable: true,
  })
  AND?: TokenEventsFilter[];

  @Field(() => [TokenEventsFilter], {
    nullable: true,
  })
  OR?: TokenEventsFilter[];
}
