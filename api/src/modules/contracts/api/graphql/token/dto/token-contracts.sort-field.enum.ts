import { registerEnumType } from '@nestjs/graphql';

export enum TokenContractsSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(TokenContractsSortFieldEnum, {
  name: 'TokenContractsSortField',
  description: 'Sort field',
});
