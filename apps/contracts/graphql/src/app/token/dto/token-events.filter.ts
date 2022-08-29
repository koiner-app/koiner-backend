import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenEventsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

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

  @Field(() => [TokenEventsFilter], {
    nullable: true,
  })
  AND?: TokenEventsFilter[];

  @Field(() => [TokenEventsFilter], {
    nullable: true,
  })
  OR?: TokenEventsFilter[];
}
