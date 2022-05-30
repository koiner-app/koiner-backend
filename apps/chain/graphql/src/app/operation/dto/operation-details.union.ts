import { createUnionType } from '@nestjs/graphql';
import {
  operationUnionTypes,
  resolveTypeFn,
} from '../../../config/chain/operation';

export const OperationDetailsUnion = createUnionType({
  name: 'OperationDetailsUnion',
  types: () => operationUnionTypes,
  resolveType: resolveTypeFn,
});
