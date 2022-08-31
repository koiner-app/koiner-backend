import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockProducer,
  BlockProducerReadRepository,
} from '@koiner/contracts/domain';
import { BlockProducerQuery } from '.';

@QueryHandler(BlockProducerQuery)
export class BlockProducerHandler implements IQueryHandler<BlockProducerQuery> {
  constructor(private readonly readRepository: BlockProducerReadRepository) {}

  async execute(query: BlockProducerQuery): Promise<BlockProducer> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
