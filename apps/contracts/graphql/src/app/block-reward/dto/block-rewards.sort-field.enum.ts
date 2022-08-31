import { registerEnumType } from '@nestjs/graphql';

export enum BlockRewardsSortFieldEnum {
  blockHeight = 'blockHeight',
  timestamp = 'timestamp',
}

registerEnumType(BlockRewardsSortFieldEnum, {
  name: 'BlockRewardsSortField',
  description: 'Sort field',
});
