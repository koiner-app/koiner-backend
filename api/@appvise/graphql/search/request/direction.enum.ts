import { registerEnumType } from '@nestjs/graphql';
import { SortDirection } from '@appvise/search/request/sort-direction-enum';

registerEnumType(SortDirection, {
  name: 'Direction',
  description: 'Sort direction',
});
