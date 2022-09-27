import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  BlockReward,
  BlockRewardWriteRepository,
} from '@koiner/network/domain';
import { CreateBlockRewardCommand } from './dto/create-block-reward.command';

@CommandHandler(CreateBlockRewardCommand)
export class CreateBlockRewardHandler
  implements ICommandHandler<CreateBlockRewardCommand>
{
  constructor(private readonly writeRepository: BlockRewardWriteRepository) {}

  async execute(command: CreateBlockRewardCommand): Promise<void> {
    const operation = BlockReward.create(
      {
        blockId: new KoinosId(command.blockId),
        blockHeight: command.blockHeight,
        producerId: new KoinosAddressId(command.producerId),
        value: command.value,
        burnerId: command.burnerId
          ? new KoinosAddressId(command.burnerId)
          : undefined,
        burnedValue: command.burnedValue,
        roi: command.roi,
        timestamp: command.timestamp,
      },
      UUID.generate()
    );

    await this.writeRepository.save(operation);
  }
}
