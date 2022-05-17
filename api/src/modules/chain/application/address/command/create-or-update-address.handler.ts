import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosAddressId } from '@koiner/domain';
import { Address, AddressWriteRepository } from '@koiner/chain/domain';
import { CreateOrUpdateAddressCommand } from './dto/create-or-update-address.command';

@CommandHandler(CreateOrUpdateAddressCommand)
export class CreateOrUpdateAddressHandler
  implements ICommandHandler<CreateOrUpdateAddressCommand>
{
  constructor(private readonly writeRepository: AddressWriteRepository) {}

  async execute(command: CreateOrUpdateAddressCommand): Promise<void> {
    let address = await this.writeRepository.findOneById(command.id);

    if (address && command.producedBlock) {
      // Mark existing address as producer
      if (!address.isProducer) {
        address.markAsProducer();
      }

      await this.writeRepository.save(address);
    }

    if (!address) {
      address = Address.create(
        {
          isProducer: command.producedBlock,
        },
        new KoinosAddressId(command.id),
      );

      await this.writeRepository.save(address);
    }
  }
}
