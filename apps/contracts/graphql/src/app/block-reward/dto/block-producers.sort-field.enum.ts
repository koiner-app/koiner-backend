import { registerEnumType } from '@nestjs/graphql';

export enum BlockProducersSortFieldEnum {
  balance = 'balance',
  blocksProduced = 'blocksProduced',
  createdAt = 'createdAt',
}

registerEnumType(BlockProducersSortFieldEnum, {
  name: 'BlockProducersSortField',
  description: 'Sort field',
});
