import { registerEnumType } from '@nestjs/graphql';

export enum TokenContractsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(TokenContractsSortFieldEnum, {
  name: 'TokenContractsSortField',
  description: 'Sort field',
});
