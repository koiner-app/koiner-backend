import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContractCreated } from '@koiner/chain/domain';

@EventsHandler(ContractCreated)
export class ConsoleLogOnContractCreated
  implements IEventHandler<ContractCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: ContractCreated): Promise<void> {
    // TODO: Do something with event
  }
}
