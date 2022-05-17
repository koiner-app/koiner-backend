import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ContractOperation,
  ContractOperationReadRepository,
} from '@koiner/contracts/domain';
import { ContractOperationQuery } from '.';

@QueryHandler(ContractOperationQuery)
export class ContractOperationHandler
  implements IQueryHandler<ContractOperationQuery>
{
  constructor(
    private readonly readRepository: ContractOperationReadRepository,
  ) {}

  async execute(query: ContractOperationQuery): Promise<ContractOperation> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
