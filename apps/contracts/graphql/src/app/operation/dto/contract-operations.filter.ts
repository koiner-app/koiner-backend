import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class ContractOperationsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  entryPoint?: NumericFilterInput;

  @Field(() => [ContractOperationsFilter], {
    nullable: true,
  })
  AND?: ContractOperationsFilter[];

  @Field(() => [ContractOperationsFilter], {
    nullable: true,
  })
  OR?: ContractOperationsFilter[];
}
