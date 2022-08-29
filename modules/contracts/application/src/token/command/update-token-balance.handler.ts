import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenBalance,
  TokenBalanceWriteRepository,
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
      command.contractId
    );

    if (tokenBalance) {
      tokenBalance.update({
        amountChanged: command.amountChanged,
      });

      await this.writeRepository.save(tokenBalance);
    } else {
      tokenBalance = TokenBalance.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
        },
        UUID.generate()
      );

      await this.writeRepository.save(tokenBalance);
    }
  }
}
