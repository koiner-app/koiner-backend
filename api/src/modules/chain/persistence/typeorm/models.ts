import { AddressSchema } from './address';
import { BlockSchema } from './block';
import { ChainSchema } from './chain';
import { EventSchema } from './event';
import { TransactionSchema } from './transaction';
import {
  OperationSchema,
  SystemCallOperationSchema,
  SystemContractOperationSchema,
  UploadContractOperationSchema,
} from './operation';

export default [
  AddressSchema,
  BlockSchema,
  ChainSchema,
  EventSchema,
  TransactionSchema,

  // Operation
  OperationSchema,
  SystemCallOperationSchema,
  SystemContractOperationSchema,
  UploadContractOperationSchema,
];
