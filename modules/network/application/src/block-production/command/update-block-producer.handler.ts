import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProducer,
  BlockProducerWriteRepository,
} from '@koiner/network/domain';
import { UpdateBlockProducerCommand } from './dto/update-block-producer.command';

@CommandHandler(UpdateBlockProducerCommand)
export class UpdateBlockProducerHandler
  implements ICommandHandler<UpdateBlockProducerCommand>
{
  constructor(private readonly writeRepository: BlockProducerWriteRepository) {}

  async execute(command: UpdateBlockProducerCommand): Promise<void> {
    let blockProducer = await this.writeRepository.findOne(
      command.addressId,
      command.contractId
    );

    if (blockProducer) {
      blockProducer.addRewards(command.amountChanged);

      await this.writeRepository.save(blockProducer);
    } else {
      blockProducer = BlockProducer.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
        },
        UUID.generate()
      );

      await this.writeRepository.save(blockProducer);
    }
  }
}
