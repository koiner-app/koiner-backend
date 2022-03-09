import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Krc20Contract,
  Krc20ContractReadRepository,
  Krc20ContractWriteRepository,
  Krc20Operation,
  Krc20OperationReadRepository,
  Krc20OperationWriteRepository,
} from '@koiner/contracts/domain';
import {
  Krc20ContractSchema,
  Krc20ContractSchemaFactory,
  Krc20OperationSchema,
  Krc20OperationSchemaFactory,
} from '@koiner/contracts/persistence/typeorm/krc20';

const krc20ContractSchemaFactory = new Krc20ContractSchemaFactory(
  Krc20Contract,
  Krc20ContractSchema,
);

const krc20OperationSchemaFactory = new Krc20OperationSchemaFactory(
  Krc20Operation,
  Krc20OperationSchema,
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

  // Krc20Operation
  TypeormRepositoryProvider.provide(
    Krc20OperationReadRepository,
    Krc20OperationSchema,
    krc20OperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    Krc20OperationWriteRepository,
    Krc20OperationSchema,
    krc20OperationSchemaFactory,
  ),
];
