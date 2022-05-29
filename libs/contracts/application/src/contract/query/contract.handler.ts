import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Contract, ContractReadRepository } from '@koiner/contracts/domain';
import { ContractQuery } from '.';

@QueryHandler(ContractQuery)
export class ContractHandler implements IQueryHandler<ContractQuery> {
  constructor(private readonly readRepository: ContractReadRepository) {}

  async execute(query: ContractQuery): Promise<Contract> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
