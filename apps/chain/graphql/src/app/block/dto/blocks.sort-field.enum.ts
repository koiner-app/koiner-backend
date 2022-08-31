import { registerEnumType } from '@nestjs/graphql';

export enum BlocksSortFieldEnum {
  height = 'height',
}

registerEnumType(BlocksSortFieldEnum, {
  name: 'BlocksSortField',
  description: 'Sort field',
});
