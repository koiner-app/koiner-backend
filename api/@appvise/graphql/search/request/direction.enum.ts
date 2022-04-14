import { registerEnumType } from '@nestjs/graphql';
import { SortDirection } from '@appvise/domain';

registerEnumType(SortDirection, {
  name: 'Direction',
  description: 'Sort direction',
});
