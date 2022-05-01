import { TypeormRepositoryProvider } from '@appvise/typeorm';
import {
  Contract,
  ContractReadRepository,
  ContractWriteRepository,
  ContractOperation,
  ContractOperationReadRepository,
  ContractOperationWriteRepository,
  BlockReward,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
  TokenBalance,
  TokenBalanceReadRepository,
  TokenBalanceWriteRepository,
  TokenContract,
  TokenContractReadRepository,
  TokenContractWriteRepository,
  TokenOperation,
  TokenOperationReadRepository,
  TokenOperationWriteRepository,
  BlockRewardBalanceReadRepository,
  BlockRewardBalanceWriteRepository,
  BlockRewardBalance,
} from '@koiner/contracts/domain';
import {
  ContractSchema,
  ContractSchemaFactory,
  ContractOperationSchema,
  ContractOperationSchemaFactory,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
  TokenBalanceSchema,
  TokenBalanceSchemaFactory,
  TokenContractSchema,
  TokenContractSchemaFactory,
  TokenOperationSchema,
  TokenOperationSchemaFactory,
  BlockRewardBalanceSchema,
  BlockRewardBalanceSchemaFactory,
} from '@koiner/contracts/persistence/typeorm';
import { TokenBalanceWriteTypeormRepository } from '@koiner/contracts/persistence/typeorm/token/token-balance.write.typeorm.repository';
import { BlockRewardBalanceWriteTypeormRepository } from '@koiner/contracts/persistence/typeorm/token/block-reward-balance.write.typeorm.repository';

const contractSchemaFactory = new ContractSchemaFactory(
  Contract,
  ContractSchema,
);

const contractOperationSchemaFactory = new ContractOperationSchemaFactory(
  ContractOperation,
  ContractOperationSchema,
);

const blockRewardSchemaFactory = new BlockRewardSchemaFactory(
  BlockReward,
  BlockRewardSchema,
);

const blockRewardBalanceSchemaFactory = new BlockRewardBalanceSchemaFactory(
  BlockRewardBalance,
  BlockRewardBalanceSchema,
);

const tokenBalanceSchemaFactory = new TokenBalanceSchemaFactory(
  TokenBalance,
  TokenBalanceSchema,
);

const tokenContractSchemaFactory = new TokenContractSchemaFactory(
  TokenContract,
  TokenContractSchema,
);

const tokenOperationSchemaFactory = new TokenOperationSchemaFactory(
  TokenOperation,
  TokenOperationSchema,
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
    false,
  ),

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
    false,
  ),

  // BlockRewardBalance
  TypeormRepositoryProvider.provide(
    BlockRewardBalanceReadRepository,
    BlockRewardBalanceSchema,
    blockRewardBalanceSchemaFactory,
  ),
  {
    provide: BlockRewardBalanceWriteRepository,
    useClass: BlockRewardBalanceWriteTypeormRepository,
  },

  // TokenBalance
  TypeormRepositoryProvider.provide(
    TokenBalanceReadRepository,
    TokenBalanceSchema,
    tokenBalanceSchemaFactory,
  ),
  {
    provide: TokenBalanceWriteRepository,
    useClass: TokenBalanceWriteTypeormRepository,
  },

  // TokenContract
  TypeormRepositoryProvider.provide(
    TokenContractReadRepository,
    TokenContractSchema,
    tokenContractSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TokenContractWriteRepository,
    TokenContractSchema,
    tokenContractSchemaFactory,
    false,
  ),

  // TokenOperation
  TypeormRepositoryProvider.provide(
    TokenOperationReadRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    TokenOperationWriteRepository,
    TokenOperationSchema,
    tokenOperationSchemaFactory,
    false,
  ),
];
