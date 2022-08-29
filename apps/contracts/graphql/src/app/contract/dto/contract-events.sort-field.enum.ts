import { registerEnumType } from '@nestjs/graphql';

export enum ContractEventsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(ContractEventsSortFieldEnum, {
  name: 'ContractEventsSortField',
  description: 'Sort field',
});
