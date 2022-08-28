import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockReward,
  BlockRewardWriteRepository,
} from '@koiner/contracts/domain';
import { CreateBlockRewardCommand } from './dto/create-block-reward.command';

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
        contractId: new KoinosAddressId(command.contractId),
        value: command.value,
        burnedContractId: command.burnedContractId
          ? new KoinosAddressId(command.burnedContractId)
          : undefined,
        burnerId: command.burnerId
          ? new KoinosAddressId(command.burnerId)
          : undefined,
        burnedValue: command.burnedValue,
        roi: command.roi,
      },
      UUID.generate()
    );

    await this.writeRepository.save(operation);
  }
}
