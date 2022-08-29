import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class ContractEventsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentType?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  sequence?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractStandardType?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  impacted?: StringFilterInput;

  @Field(() => [ContractEventsFilter], {
    nullable: true,
  })
  AND?: ContractEventsFilter[];

  @Field(() => [ContractEventsFilter], {
    nullable: true,
  })
  OR?: ContractEventsFilter[];
}
