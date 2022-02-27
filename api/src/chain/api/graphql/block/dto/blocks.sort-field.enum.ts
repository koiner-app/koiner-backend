import { registerEnumType } from '@nestjs/graphql';

export enum BlocksSortFieldEnum {
  id = 'id',
  height = 'height',
}

registerEnumType(BlocksSortFieldEnum, {
  name: 'BlocksSortField',
  description: 'Sort field',
});
