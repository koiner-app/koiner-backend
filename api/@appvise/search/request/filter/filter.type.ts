import {
  //   BooleanFilter,
  //   DateTimeFilter,
  //   GeoFilter,
  //   NumericFilter,
  StringFilter,
} from '.';

export type FilterType = {
  AND?: FilterType[];
  OR?: FilterType[];
} & {
  search?: StringFilter;
  // TODO: Make wildcard typing work somehow
  [index: string]: any;
  // [index: string]: StringFilter | NumericFilter | BooleanFilter | GeoFilter | DateTimeFilter | FilterType[],
};
