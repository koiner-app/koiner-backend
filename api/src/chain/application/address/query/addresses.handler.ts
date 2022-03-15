import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Address, AddressReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/search';
import { AddressesQuery } from '.';

@QueryHandler(AddressesQuery)
export class AddressesHandler implements IQueryHandler<AddressesQuery> {
  constructor(private readonly readRepository: AddressReadRepository) {}

  async execute(query: AddressesQuery): Promise<SearchResponse<Address>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
