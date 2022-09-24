import { registerEnumType } from '@nestjs/graphql';

export enum TokenOperationsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(TokenOperationsSortFieldEnum, {
  name: 'TokenOperationsSortField',
  description: 'Sort field',
});
