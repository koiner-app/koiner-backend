import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddressCreated } from '@koiner/chain/domain';

@EventsHandler(AddressCreated)
export class ConsoleLogOnAddressCreated
  implements IEventHandler<AddressCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: AddressCreated): Promise<void> {
    console.log('AddressCreated:', event.addressId);
  }
}
