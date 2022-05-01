import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BlockReward,
  BlockRewardWriteRepository,
} from '@koiner/contracts/domain';
import { CreateBlockRewardCommand } from './dto/create-block-reward.command';
import { KoinosAddressId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

@CommandHandler(CreateBlockRewardCommand)
export class CreateBlockRewardHandler
  implements ICommandHandler<CreateBlockRewardCommand>
{
  constructor(private readonly writeRepository: BlockRewardWriteRepository) {}

  async execute(command: CreateBlockRewardCommand): Promise<void> {
    const operation = BlockReward.create(
      {
        blockHeight: command.blockHeight,
        producerId: new KoinosAddressId(command.producerId),
        value: command.value,
        contractId: new KoinosAddressId(command.contractId),
      },
      UUID.generate(),
    );

    await this.writeRepository.save(operation);
  }
}
