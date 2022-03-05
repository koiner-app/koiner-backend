import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class AddressesFilter implements FilterType {
  @Field((type) => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  blockHeight?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  signer?: StringFilterInput;

  @Field((type) => [AddressesFilter], {
    nullable: true,
  })
  AND?: AddressesFilter[];

  @Field((type) => [AddressesFilter], {
    nullable: true,
  })
  OR?: AddressesFilter[];
}
