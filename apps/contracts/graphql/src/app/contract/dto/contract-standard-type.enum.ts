import { registerEnumType } from '@nestjs/graphql';
import { ContractStandardType } from '@koiner/contracts/standards';

registerEnumType(ContractStandardType, {
  name: 'ContractStandardType',
  description: 'Contract Standard type',
});
