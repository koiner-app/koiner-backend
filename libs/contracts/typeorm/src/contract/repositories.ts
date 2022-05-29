import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Contract,
  ContractReadRepository,
  ContractWriteRepository,
} from '@koiner/contracts/domain';
import { ContractSchema, ContractSchemaFactory } from '.';

// Factories
const contractSchemaFactory = new ContractSchemaFactory(
  Contract,
  ContractSchema,
);

export const ContractRepositories: Provider[] = [
  // Contract
  TypeormRepositoryProvider.provide(
    ContractReadRepository,
    ContractSchema,
    contractSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ContractWriteRepository,
    ContractSchema,
    contractSchemaFactory,
    false,
  ),
];
