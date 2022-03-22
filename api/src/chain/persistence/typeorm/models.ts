import { AddressSchema } from './address';
import { BlockSchema } from './block';
import { ChainSchema } from './chain';
import { TransactionSchema } from './transaction';
import {
  OperationSchema,
  ContractOperationSchema,
  SystemCallOperationSchema,
  SystemContractOperationSchema,
  UploadContractOperationSchema,
} from './operation';

export default [
  AddressSchema,
  BlockSchema,
  ChainSchema,
  TransactionSchema,

  // Operation
  OperationSchema,
  ContractOperationSchema,
  SystemCallOperationSchema,
  SystemContractOperationSchema,
  UploadContractOperationSchema,
];
