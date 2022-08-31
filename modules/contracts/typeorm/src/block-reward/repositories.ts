import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  BlockReward,
  BlockProducer,
  BlockProducerReadRepository,
  BlockProducerWriteRepository,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
} from '@koiner/contracts/domain';
import {
  BlockRewardReadTypeormRepository,
  BlockProducerSchema,
  BlockProducerSchemaFactory,
  BlockProducerWriteTypeormRepository,
  BlockRewardSchema,
  BlockRewardSchemaFactory,
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
];
