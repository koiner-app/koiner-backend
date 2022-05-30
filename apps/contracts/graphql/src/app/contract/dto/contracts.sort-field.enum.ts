import { registerEnumType } from '@nestjs/graphql';

export enum ContractsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(ContractsSortFieldEnum, {
  name: 'ContractsSortField',
  description: 'Sort field',
});
