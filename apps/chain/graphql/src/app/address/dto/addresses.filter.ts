import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { BooleanFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class AddressesFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => BooleanFilterInput, { nullable: true })
  isProducer?: BooleanFilterInput;

  @Field(() => BooleanFilterInput, { nullable: true })
  isContract?: BooleanFilterInput;

  @Field(() => BooleanFilterInput, { nullable: true })
  isTokenContract?: BooleanFilterInput;

  @Field(() => [AddressesFilter], {
    nullable: true,
  })
  AND?: AddressesFilter[];

  @Field(() => [AddressesFilter], {
    nullable: true,
  })
  OR?: AddressesFilter[];
}
