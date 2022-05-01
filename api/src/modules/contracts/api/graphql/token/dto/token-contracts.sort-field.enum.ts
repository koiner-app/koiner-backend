import { registerEnumType } from '@nestjs/graphql';

export enum TokenContractsSortFieldEnum {
  id = 'id',
  blockHeight = 'blockHeight',
}

registerEnumType(TokenContractsSortFieldEnum, {
  name: 'TokenContractsSortField',
  description: 'Sort field',
});
