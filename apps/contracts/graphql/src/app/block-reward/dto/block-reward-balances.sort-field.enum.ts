import { registerEnumType } from '@nestjs/graphql';

export enum BlockRewardBalancesSortFieldEnum {
  balance = 'balance',
  createdAt = 'createdAt',
}

registerEnumType(BlockRewardBalancesSortFieldEnum, {
  name: 'BlockRewardBalancesSortField',
  description: 'Sort field',
});
