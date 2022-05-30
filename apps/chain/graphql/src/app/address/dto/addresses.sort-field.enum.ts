import { registerEnumType } from '@nestjs/graphql';

export enum AddressesSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(AddressesSortFieldEnum, {
  name: 'AddressesSortField',
  description: 'Sort field',
});
