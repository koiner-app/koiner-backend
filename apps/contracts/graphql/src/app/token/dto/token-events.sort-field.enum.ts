import { registerEnumType } from '@nestjs/graphql';

export enum TokenEventsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(TokenEventsSortFieldEnum, {
  name: 'TokenEventsSortField',
  description: 'Sort field',
});
