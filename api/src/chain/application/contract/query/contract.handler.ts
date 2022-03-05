import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Contract, ContractReadRepository } from '@koiner/chain/domain';
import { ContractQuery } from './contract.query';

@QueryHandler(ContractQuery)
export class ContractHandler implements IQueryHandler<ContractQuery> {
  constructor(private readonly readRepository: ContractReadRepository) {}

  async execute(query: ContractQuery): Promise<Contract> {
    return this.readRepository.findOneByIdOrThrow(
      query.contractId,
      query.selectionSet,
    );
  }
}
