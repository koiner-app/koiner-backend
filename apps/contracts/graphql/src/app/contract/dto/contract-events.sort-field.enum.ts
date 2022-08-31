import { registerEnumType } from '@nestjs/graphql';

export enum ContractEventsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(ContractEventsSortFieldEnum, {
  name: 'ContractEventsSortField',
  description: 'Sort field',
});
