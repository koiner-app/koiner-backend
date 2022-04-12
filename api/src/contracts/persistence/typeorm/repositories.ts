import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Contract,
  ContractReadRepository,
  ContractWriteRepository,
  BlockReward,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
  Krc20Balance,
  Krc20BalanceReadRepository,
  Krc20BalanceWriteRepository,
  Krc20Contract,
  Krc20ContractReadRepository,
  Krc20ContractWriteRepository,
  Krc20Operation,
  Krc20OperationReadRepository,
  Krc20OperationWriteRepository,
} from '@koiner/contracts/domain';
import {
  ContractSchema,
  ContractSchemaFactory,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
  Krc20BalanceSchema,
  Krc20BalanceSchemaFactory,
  Krc20ContractSchema,
  Krc20ContractSchemaFactory,
  Krc20OperationSchema,
  Krc20OperationSchemaFactory,
} from '@koiner/contracts/persistence/typeorm';
import { Krc20BalanceWriteTypeormRepository } from '@koiner/contracts/persistence/typeorm/krc20/krc20-balance.write.typeorm.repository';

const contractSchemaFactory = new ContractSchemaFactory(
  Contract,
  ContractSchema,
);

const blockRewardSchemaFactory = new BlockRewardSchemaFactory(
  BlockReward,
  BlockRewardSchema,
);

const krc20BalanceSchemaFactory = new Krc20BalanceSchemaFactory(
  Krc20Balance,
  Krc20BalanceSchema,
);

const krc20ContractSchemaFactory = new Krc20ContractSchemaFactory(
  Krc20Contract,
  Krc20ContractSchema,
);

const krc20OperationSchemaFactory = new Krc20OperationSchemaFactory(
  Krc20Operation,
  Krc20OperationSchema,
);

export default [
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
  ),

  // BlockReward
  TypeormRepositoryProvider.provide(
    BlockRewardReadRepository,
    BlockRewardSchema,
    blockRewardSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    BlockRewardWriteRepository,
    BlockRewardSchema,
    blockRewardSchemaFactory,
  ),

  // Krc20Balance
  TypeormRepositoryProvider.provide(
    Krc20BalanceReadRepository,
    Krc20BalanceSchema,
    krc20BalanceSchemaFactory,
  ),
  {
    provide: Krc20BalanceWriteRepository,
    useClass: Krc20BalanceWriteTypeormRepository,
  },

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
