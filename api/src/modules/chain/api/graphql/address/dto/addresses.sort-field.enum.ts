import { registerEnumType } from '@nestjs/graphql';

export enum AddressesSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(AddressesSortFieldEnum, {
  name: 'AddressesSortField',
  description: 'Sort field',
});
