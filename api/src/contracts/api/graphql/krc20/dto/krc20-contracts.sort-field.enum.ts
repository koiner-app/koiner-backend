import { registerEnumType } from '@nestjs/graphql';

export enum Krc20ContractsSortFieldEnum {
  id = 'id',
  blockHeight = 'blockHeight',
}

registerEnumType(Krc20ContractsSortFieldEnum, {
  name: 'Krc20ContractsSortField',
  description: 'Sort field',
});
