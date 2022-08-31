import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Contract,
  ContractReadRepository,
  ContractWriteRepository,
  ContractEvent,
  ContractEventReadRepository,
  ContractEventWriteRepository,
  ContractOperation,
  ContractOperationReadRepository,
  ContractOperationWriteRepository,
} from '@koiner/contracts/domain';
import {
  ContractSchema,
  ContractEventSchema,
  ContractEventSchemaFactory,
  ContractSchemaFactory,
  ContractOperationSchema,
  ContractOperationSchemaFactory,
} from '.';

// Factories
const contractSchemaFactory = new ContractSchemaFactory(
  Contract,
  ContractSchema
);

const contractEventSchemaFactory = new ContractEventSchemaFactory(
  ContractEvent,
  ContractEventSchema
);

const contractOperationSchemaFactory = new ContractOperationSchemaFactory(
  ContractOperation,
  ContractOperationSchema
);

export const ContractRepositories: Provider[] = [
  // Contract
  TypeormRepositoryProvider.provide(
    ContractReadRepository,
    ContractSchema,
    contractSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    ContractWriteRepository,
    ContractSchema,
    contractSchemaFactory,
    false
  ),

  // ContractEvent
  TypeormRepositoryProvider.provide(
    ContractEventReadRepository,
    ContractEventSchema,
    contractEventSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    ContractEventWriteRepository,
    ContractEventSchema,
    contractEventSchemaFactory,
    false
  ),

  // ContractOperation
  TypeormRepositoryProvider.provide(
    ContractOperationReadRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    ContractOperationWriteRepository,
    ContractOperationSchema,
    contractOperationSchemaFactory,
    false
  ),
];
