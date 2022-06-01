import { registerEnumType } from '@nestjs/graphql';

export enum EventsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(EventsSortFieldEnum, {
  name: 'EventsSortField',
  description: 'Sort field',
});
