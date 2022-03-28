import { registerEnumType } from '@nestjs/graphql';

export enum Krc20OperationsSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(Krc20OperationsSortFieldEnum, {
  name: 'Krc20OperationsSortField',
  description: 'Sort field',
});
