import { WriteRepository } from '@appvise/domain';
import { Block } from './block';

export abstract class BlockWriteRepository extends WriteRepository<Block> {}
