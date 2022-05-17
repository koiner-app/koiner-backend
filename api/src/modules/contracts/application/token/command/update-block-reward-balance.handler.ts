import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockRewardBalance,
  BlockRewardBalanceWriteRepository,
} from '@koiner/contracts/domain';
import { UpdateBlockRewardBalanceCommand } from './dto/update-block-reward-balance.command';

@CommandHandler(UpdateBlockRewardBalanceCommand)
export class UpdateBlockRewardBalanceHandler
  implements ICommandHandler<UpdateBlockRewardBalanceCommand>
{
  constructor(
    private readonly writeRepository: BlockRewardBalanceWriteRepository,
  ) {}

  async execute(command: UpdateBlockRewardBalanceCommand): Promise<void> {
    let blockRewardBalance = await this.writeRepository.findOne(
      command.addressId,
      command.contractId,
    );

    if (blockRewardBalance) {
      blockRewardBalance.addRewards(command.amountChanged);

      await this.writeRepository.save(blockRewardBalance);
    } else {
      blockRewardBalance = BlockRewardBalance.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
        },
        UUID.generate(),
      );

      await this.writeRepository.save(blockRewardBalance);
    }
  }
}
