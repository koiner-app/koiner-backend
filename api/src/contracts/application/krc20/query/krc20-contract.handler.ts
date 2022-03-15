import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Krc20Contract,
  Krc20ContractReadRepository,
} from '@koiner/contracts/domain';
import { Krc20ContractQuery } from '.';

@QueryHandler(Krc20ContractQuery)
export class Krc20ContractHandler implements IQueryHandler<Krc20ContractQuery> {
  constructor(private readonly readRepository: Krc20ContractReadRepository) {}

  async execute(query: Krc20ContractQuery): Promise<Krc20Contract> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
