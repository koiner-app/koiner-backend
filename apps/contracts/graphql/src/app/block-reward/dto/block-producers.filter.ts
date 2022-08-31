import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class BlockProducersFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  addressId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  balance?: NumericFilterInput;

  @Field(() => [BlockProducersFilter], {
    nullable: true,
  })
  AND?: BlockProducersFilter[];

  @Field(() => [BlockProducersFilter], {
    nullable: true,
  })
  OR?: BlockProducersFilter[];
}
