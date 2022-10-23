import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  BlockReward,
  BlockProducer,
  BlockProducerReadRepository,
  BlockProducerWriteRepository,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
  BlockProductionStats,
  BlockProductionStatsReadRepository,
  BlockProductionStatsWriteRepository,
} from '@koiner/network/domain';
import {
  BlockRewardReadTypeormRepository,
  BlockProducerSchema,
  BlockProducerSchemaFactory,
  BlockProducerWriteTypeormRepository,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
  BlockProductionStatsSchemaFactory,
  BlockProductionStatsSchema,
  BlockProductionStatsReadTypeormRepository,
} from '.';

// Factories
const blockRewardSchemaFactory = new BlockRewardSchemaFactory(
  BlockReward,
  BlockRewardSchema
);

const blockProducerSchemaFactory = new BlockProducerSchemaFactory(
  BlockProducer,
  BlockProducerSchema
);

const blockProductionStatsSchemaFactory = new BlockProductionStatsSchemaFactory(
  BlockProductionStats,
  BlockProductionStatsSchema
);

export const BlockProductionRepositories: Provider[] = [
  // BlockReward
  {
    provide: BlockRewardReadRepository,
    useClass: BlockRewardReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockRewardWriteRepository,
    BlockRewardSchema,
    blockRewardSchemaFactory,
    false
  ),

  // BlockProducer
  TypeormRepositoryProvider.provide(
    BlockProducerReadRepository,
    BlockProducerSchema,
    blockProducerSchemaFactory
  ),
  {
    provide: BlockProducerWriteRepository,
    useClass: BlockProducerWriteTypeormRepository,
  },

  // BlockProductionStats
  {
    provide: BlockProductionStatsReadRepository,
    useClass: BlockProductionStatsReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockProductionStatsWriteRepository,
    BlockProductionStatsSchema,
    blockProductionStatsSchemaFactory,
    false
  ),
];
