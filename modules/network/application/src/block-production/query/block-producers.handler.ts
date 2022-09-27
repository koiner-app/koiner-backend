import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockProducer,
  BlockProducerReadRepository,
} from '@koiner/network/domain';
import { SearchResponse } from '@appvise/domain';
import { BlockProducersQuery } from '.';

@QueryHandler(BlockProducersQuery)
export class BlockProducersHandler
  implements IQueryHandler<BlockProducersQuery>
{
  constructor(private readonly readRepository: BlockProducerReadRepository) {}

  async execute(
    query: BlockProducersQuery
  ): Promise<SearchResponse<BlockProducer>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
