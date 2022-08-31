import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenHoldersFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  addressId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  balance?: NumericFilterInput;

  @Field(() => [TokenHoldersFilter], {
    nullable: true,
  })
  AND?: TokenHoldersFilter[];

  @Field(() => [TokenHoldersFilter], {
    nullable: true,
  })
  OR?: TokenHoldersFilter[];
}
