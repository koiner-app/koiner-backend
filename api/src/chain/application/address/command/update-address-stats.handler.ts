import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddressWriteRepository } from '@koiner/chain/domain';
import { UpdateAddressStatsCommand } from './dto/update-address-stats.command';

@CommandHandler(UpdateAddressStatsCommand)
export class UpdateAddressStatsHandler
  implements ICommandHandler<UpdateAddressStatsCommand>
{
  constructor(
    private readonly writeRepository: AddressWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: UpdateAddressStatsCommand): Promise<void> {
    const address = this.eventPublisher.mergeObjectContext(
      await this.writeRepository.findOneByIdOrThrow(command.addressId),
    );

    address.updateStats(command.stats);

    await this.writeRepository.save(address);

    address.commit();
  }
}
