import { ReadRepository, WriteRepository, SelectionSet } from '@appvise/domain';
import { Block } from '..';

export abstract class BlockReadRepository extends ReadRepository<Block> {
  abstract findOneByHeight(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<Block | undefined>;

  abstract findOneByHeightOrThrow(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<Block>;
}

export abstract class BlockWriteRepository extends WriteRepository<Block> {}
