import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  BlockReward,
  BlockRewardBalance,
  BlockRewardBalanceReadRepository,
  BlockRewardBalanceWriteRepository,
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
} from '@koiner/contracts/domain';
import {
  BlockRewardBalanceSchema,
  BlockRewardBalanceSchemaFactory,
  BlockRewardBalanceWriteTypeormRepository,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
  TokenBalanceSchema,
  TokenBalanceSchemaFactory,
  TokenBalanceWriteTypeormRepository,
  TokenContractSchema,
  TokenContractSchemaFactory,
  TokenOperationSchema,
  TokenOperationSchemaFactory,
} from '.';

// Factories
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

export const TokenRepositories: Provider[] = [
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
