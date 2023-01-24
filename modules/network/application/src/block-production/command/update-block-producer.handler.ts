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
      blockProducer.addRewards(
        command.mintedValue,
        command.burnedValue,
        command.lastProducedBlock
      );

      await this.writeRepository.save(blockProducer);
    } else {
      blockProducer = BlockProducer.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.mintedValue - command.burnedValue,
          mintedTotal: command.mintedValue,
          burnedTotal: command.burnedValue,
          lastProducedBlock: command.lastProducedBlock,
        },
        UUID.generate()
      );

      await this.writeRepository.save(blockProducer);
    }
  }
}
