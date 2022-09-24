import { registerEnumType } from '@nestjs/graphql';

export enum TokenEventsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(TokenEventsSortFieldEnum, {
  name: 'TokenEventsSortField',
  description: 'Sort field',
});
