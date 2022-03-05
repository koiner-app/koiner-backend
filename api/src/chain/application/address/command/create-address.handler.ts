import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Address, AddressWriteRepository } from '@koiner/chain/domain';
import { CreateAddressCommand } from './create-address.command';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateAddressCommand)
export class CreateAddressHandler
  implements ICommandHandler<CreateAddressCommand>
{
  constructor(
    private readonly writeRepository: AddressWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateAddressCommand): Promise<void> {
    if (!(await this.writeRepository.exists(command.id))) {
      const address = this.eventPublisher.mergeObjectContext(
        await Address.create({}, new KoinosAddressId(command.id)),
      );

      await this.writeRepository.save(address);

      address.commit();
    }
  }
}
