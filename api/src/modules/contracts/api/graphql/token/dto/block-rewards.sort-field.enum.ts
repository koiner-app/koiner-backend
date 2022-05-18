import { registerEnumType } from '@nestjs/graphql';

export enum BlockRewardsSortFieldEnum {
  blockHeight = 'blockHeight',
  createdAt = 'createdAt',
}

registerEnumType(BlockRewardsSortFieldEnum, {
  name: 'BlockRewardsSortField',
  description: 'Sort field',
});
