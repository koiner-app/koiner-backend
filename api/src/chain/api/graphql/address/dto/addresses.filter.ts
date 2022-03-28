import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class AddressesFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  contractCount?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  operationCount?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  transactionCount?: NumericFilterInput;

  @Field(() => [AddressesFilter], {
    nullable: true,
  })
  AND?: AddressesFilter[];

  @Field(() => [AddressesFilter], {
    nullable: true,
  })
  OR?: AddressesFilter[];
}
