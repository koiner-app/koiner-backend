import { registerEnumType } from '@nestjs/graphql';

export enum OperationsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(OperationsSortFieldEnum, {
  name: 'OperationsSortField',
  description: 'Sort field',
});
