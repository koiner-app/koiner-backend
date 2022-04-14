import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import {
  Krc20Balance,
  Krc20BalanceWriteRepository,
} from '@koiner/contracts/domain';
import { UpdateKrc20BalanceCommand } from './dto/update-krc20-balance.command';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(UpdateKrc20BalanceCommand)
export class UpdateKrc20BalanceHandler
  implements ICommandHandler<UpdateKrc20BalanceCommand>
{
  constructor(private readonly writeRepository: Krc20BalanceWriteRepository) {}

  async execute(command: UpdateKrc20BalanceCommand): Promise<void> {
    let krc20Balance = await this.writeRepository.findOne(
      command.addressId,
      command.contractId,
    );

    if (krc20Balance) {
      krc20Balance.update(command.amountChanged);

      await this.writeRepository.save(krc20Balance);
    } else {
      krc20Balance = Krc20Balance.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
        },
        UUID.generate(),
      );

      await this.writeRepository.save(krc20Balance);
    }
  }
}
