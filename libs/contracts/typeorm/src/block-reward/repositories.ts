import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  BlockReward,
  BlockRewardBalance,
  BlockRewardBalanceReadRepository,
  BlockRewardBalanceWriteRepository,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
} from '@koiner/contracts/domain';
import {
  BlockRewardReadTypeormRepository,
  BlockRewardBalanceSchema,
  BlockRewardBalanceSchemaFactory,
  BlockRewardBalanceWriteTypeormRepository,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
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

export const BlockRewardRepositories: Provider[] = [
  // BlockReward
  {
    provide: BlockRewardReadRepository,
    useClass: BlockRewardReadTypeormRepository,
  },
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
];
