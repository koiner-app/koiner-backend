import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Krc20Contract,
  Krc20ContractReadRepository,
  Krc20ContractWriteRepository,
} from '@koiner/contracts/domain';
import {
  Krc20ContractSchema,
  Krc20ContractSchemaFactory,
} from '@koiner/contracts/persistence/typeorm/krc20';

const krc20ContractSchemaFactory = new Krc20ContractSchemaFactory(
  Krc20Contract,
  Krc20ContractSchema,
);

export default [
  // Krc20Contract
  TypeormRepositoryProvider.provide(
    Krc20ContractReadRepository,
    Krc20ContractSchema,
    krc20ContractSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    Krc20ContractWriteRepository,
    Krc20ContractSchema,
    krc20ContractSchemaFactory,
  ),
];
