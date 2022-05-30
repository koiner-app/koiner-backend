import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Block,
  BlockReadRepository,
  BlockWriteRepository,
} from '@koiner/chain/domain';
import { BlockSchema, BlockSchemaFactory, BlockReadTypeormRepository } from '.';

// Factories
const blockSchemaFactory = new BlockSchemaFactory(Block, BlockSchema);

export const BlockRepositories: Provider[] = [
  // Block
  {
    provide: BlockReadRepository,
    useClass: BlockReadTypeormRepository,
  },
  TypeormRepositoryProvider.provide(
    BlockWriteRepository,
    BlockSchema,
    blockSchemaFactory,
    false,
  ),
];
