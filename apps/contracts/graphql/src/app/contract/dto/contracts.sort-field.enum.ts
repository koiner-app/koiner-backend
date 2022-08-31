import { registerEnumType } from '@nestjs/graphql';

export enum ContractsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(ContractsSortFieldEnum, {
  name: 'ContractsSortField',
  description: 'Sort field',
});
