import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Address, AddressReadRepository } from '@koiner/contracts/domain';
import { AddressQuery } from '.';

@QueryHandler(AddressQuery)
export class AddressHandler implements IQueryHandler<AddressQuery> {
  constructor(private readonly readRepository: AddressReadRepository) {}

  async execute(query: AddressQuery): Promise<Address> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
