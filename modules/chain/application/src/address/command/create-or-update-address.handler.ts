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

    if (
      address &&
      // Only update is one of the flags has been changed
      ((command.isContract && !address.isContract) ||
        (command.isProducer && !address.isProducer) ||
        (command.isTokenContract && !address.isTokenContract))
    ) {
      // Mark existing address as contract
      if (command.isContract) {
        address.markAsContract();
      }

      // Mark existing address as producer
      if (command.isProducer) {
        address.markAsProducer();
      }

      // Mark existing address as token contract
      if (command.isTokenContract) {
        address.markAsTokenContract();
      }

      await this.writeRepository.save(address);
    }

    if (!address) {
      address = Address.create(
        {
          isContract: command.isContract ?? false,
          isProducer: command.isProducer ?? false,
          isTokenContract: command.isTokenContract ?? false,
        },
        new KoinosAddressId(command.id)
      );

      await this.writeRepository.save(address);
    }
  }
}
