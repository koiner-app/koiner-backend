import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Krc20ContractCreated } from '@koiner/contracts/domain';

@EventsHandler(Krc20ContractCreated)
export class ConsoleLogOnKrc20ContractCreated
  implements IEventHandler<Krc20ContractCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: Krc20ContractCreated): Promise<void> {
    // console.log('Krc20ContractCreated', event.contractId);
    // await this.commandBus.execute(
    //   new UpdateKrc20ContractStatsCommand(event.contractId, {
    //     projectCount: 1,
    //   }),
    // );
  }
}
