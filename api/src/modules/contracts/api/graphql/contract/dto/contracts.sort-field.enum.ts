import { registerEnumType } from '@nestjs/graphql';

export enum ContractsSortFieldEnum {
  id = 'id',
  blockHeight = 'blockHeight',
}

registerEnumType(ContractsSortFieldEnum, {
  name: 'ContractsSortField',
  description: 'Sort field',
});
