import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Address, AddressReadRepository } from '@koiner/chain/domain';
import { AddressQuery } from './address.query';

@QueryHandler(AddressQuery)
export class AddressHandler implements IQueryHandler<AddressQuery> {
  constructor(private readonly readRepository: AddressReadRepository) {}

  async execute(query: AddressQuery): Promise<Address> {
    return this.readRepository.findOneByIdOrThrow(
      query.addressId,
      query.selectionSet,
    );
  }
}
