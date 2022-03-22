import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChainCreated } from '@koiner/chain/domain';

@EventsHandler(ChainCreated)
export class ConsoleLogOnChainCreated implements IEventHandler<ChainCreated> {
  constructor(private commandBus: CommandBus) {}

  async handle(event: ChainCreated): Promise<void> {
    // console.log('ChainCreated:', event.chainId);
  }
}
