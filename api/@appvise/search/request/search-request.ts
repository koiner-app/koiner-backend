import { FilterType } from './filter/filter.type';
import { SortField } from './sort-field';

export interface SearchRequest {
  first: number;
  before?: string;
  after?: string;
  filter?: FilterType;
  sort?: SortField[];
}
