import { registerEnumType } from '@nestjs/graphql';

export enum TokenContractsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(TokenContractsSortFieldEnum, {
  name: 'TokenContractsSortField',
  description: 'Sort field',
});
