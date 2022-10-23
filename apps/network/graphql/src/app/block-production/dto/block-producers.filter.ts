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

  @Field(() => NumericFilterInput, { nullable: true })
  balance?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blocksProduced?: NumericFilterInput;

  @Field(() => [BlockProducersFilter], {
    nullable: true,
  })
  AND?: BlockProducersFilter[];

  @Field(() => [BlockProducersFilter], {
    nullable: true,
  })
  OR?: BlockProducersFilter[];
}
