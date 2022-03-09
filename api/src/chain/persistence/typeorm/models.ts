import { AddressSchema } from './address/address.schema';
import { BlockSchema } from './block/block.schema';
import { ContractSchema } from './contract/contract.schema';
import { TransactionSchema } from './transaction/transaction.schema';
import { OperationSchema } from './operation/operation.schema';
import { ContractOperationSchema } from './operation/contract-operation.schema';
import { SystemCallOperationSchema } from './operation/system-call-operation.schema';
import { SystemContractOperationSchema } from './operation/system-contract-operation.schema';
import { UploadContractOperationSchema } from './operation/upload-contract-operation.schema';

export default [
  AddressSchema,
  BlockSchema,
  ContractSchema,
  TransactionSchema,

  // Operation
  OperationSchema,
  ContractOperationSchema,
  SystemCallOperationSchema,
  SystemContractOperationSchema,
  UploadContractOperationSchema,
];
