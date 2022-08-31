import { registerEnumType } from '@nestjs/graphql';

export enum BlockProducersSortFieldEnum {
  balance = 'balance',
  createdAt = 'createdAt',
}

registerEnumType(BlockProducersSortFieldEnum, {
  name: 'BlockProducersSortField',
  description: 'Sort field',
});
