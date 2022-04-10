import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  Address,
  AddressStatistics,
  AddressWriteRepository,
} from '@koiner/chain/domain';
import { CreateOrUpdateAddressCommand } from './dto/create-or-update-address.command';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateOrUpdateAddressCommand)
export class CreateOrUpdateAddressHandler
  implements ICommandHandler<CreateOrUpdateAddressCommand>
{
  constructor(
    private readonly writeRepository: AddressWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateOrUpdateAddressCommand): Promise<void> {
    let address = await this.writeRepository.findOneById(command.id);

    if (address && command.producedBlock) {
      // Make possible to dispatch event
      address = this.eventPublisher.mergeObjectContext(address);

      // Mark existing address as producer
      if (!address.isProducer) {
        address.markAsProducer();
      }

      if (command.rewardsReceived) {
        address.addRewards(command.rewardsReceived);
      }

      // Update stats
      address.updateStats({
        blockCount: 1,
      });

      await this.writeRepository.save(address);

      address.commit();
    }

    if (!address) {
      address = this.eventPublisher.mergeObjectContext(
        Address.create(
          {
            isProducer: command.producedBlock,
            rewardsReceived: command.rewardsReceived ?? 0,
            stats: AddressStatistics.create(command.producedBlock ? 1 : 0),
          },
          new KoinosAddressId(command.id),
        ),
      );

      await this.writeRepository.save(address);

      address.commit();
    }
  }
}
