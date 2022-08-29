import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ContractEvent,
  ContractEventReadRepository,
} from '@koiner/contracts/domain';
import { ContractEventQuery } from '.';

@QueryHandler(ContractEventQuery)
export class ContractEventHandler implements IQueryHandler<ContractEventQuery> {
  constructor(private readonly readRepository: ContractEventReadRepository) {}

  async execute(query: ContractEventQuery): Promise<ContractEvent> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
