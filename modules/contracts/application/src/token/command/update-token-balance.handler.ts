import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenBalance,
  TokenBalanceWriteRepository,
  TokensOrigin,
} from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from './dto/update-token-balance.command';

@CommandHandler(UpdateTokenBalanceCommand)
export class UpdateTokenBalanceHandler
  implements ICommandHandler<UpdateTokenBalanceCommand>
{
  constructor(private readonly writeRepository: TokenBalanceWriteRepository) {}

  async execute(command: UpdateTokenBalanceCommand): Promise<void> {
    let tokenBalance = await this.writeRepository.findOne(
      command.addressId,
      command.contractId,
    );

    if (tokenBalance) {
      tokenBalance.update({
        amountChanged: command.amountChanged,
        tokensOrigin: command.tokensOrigin,
      });

      await this.writeRepository.save(tokenBalance);
    } else {
      tokenBalance = TokenBalance.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
          rewardsReceived:
            command.tokensOrigin === TokensOrigin.blockReward
              ? command.amountChanged
              : undefined,
        },
        command.tokensOrigin,
        UUID.generate(),
      );

      await this.writeRepository.save(tokenBalance);
    }
  }
}
