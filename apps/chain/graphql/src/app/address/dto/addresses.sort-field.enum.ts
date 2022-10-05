import { registerEnumType } from '@nestjs/graphql';

export enum AddressesSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(AddressesSortFieldEnum, {
  name: 'AddressesSortField',
  description: 'Sort field',
});
