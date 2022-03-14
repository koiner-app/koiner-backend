import { registerEnumType } from '@nestjs/graphql';
import { ContractStandardType } from '@koiner/contracts/domain';

registerEnumType(ContractStandardType, {
  name: 'ContractStandardType',
  description: 'Token Standard type',
});
