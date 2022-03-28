import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Krc20Operation,
  Krc20OperationReadRepository,
} from '@koiner/contracts/domain';
import { Krc20OperationQuery } from '.';

@QueryHandler(Krc20OperationQuery)
export class Krc20OperationHandler
  implements IQueryHandler<Krc20OperationQuery>
{
  constructor(private readonly readRepository: Krc20OperationReadRepository) {}

  async execute(query: Krc20OperationQuery): Promise<Krc20Operation> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
