import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  ContractOperation,
  ContractOperationReadRepository,
  ContractOperationWriteRepository,
} from '@koiner/contracts/domain';
import { ContractOperationSchema, ContractOperationSchemaFactory } from '.';

// Factories
const contractOperationSchemaFactory = new ContractOperationSchemaFactory(
  ContractOperation,
  ContractOperationSchema,
);

export const ContractOperationRepositories: Provider[] = [
  // ContractOperation
  TypeormRepositoryProvider.provide(
    ContractOperationReadRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ContractOperationWriteRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory,
    false,
  ),
];
