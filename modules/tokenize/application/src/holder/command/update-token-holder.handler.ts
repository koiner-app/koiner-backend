import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenHolder,
  TokenHolderWriteRepository,
} from '@koiner/tokenize/domain';
import { UpdateTokenHolderCommand } from './dto/update-token-holder.command';

@CommandHandler(UpdateTokenHolderCommand)
export class UpdateTokenHolderHandler
  implements ICommandHandler<UpdateTokenHolderCommand>
{
  constructor(private readonly writeRepository: TokenHolderWriteRepository) {}

  async execute(command: UpdateTokenHolderCommand): Promise<void> {
    let tokenHolder = await this.writeRepository.findOne(
      command.addressId,
      command.contractId
    );

    if (tokenHolder) {
      tokenHolder.update({
        amountChanged: command.amountChanged,
        burnCount: command.burnCount,
        mintCount: command.mintCount,
        transferInCount: command.transferInCount,
        transferOutCount: command.transferOutCount,
      });

      await this.writeRepository.save(tokenHolder);
    } else {
      tokenHolder = TokenHolder.create(
        {
          addressId: new KoinosAddressId(command.addressId),
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
          burnCount: command.burnCount,
          mintCount: command.mintCount,
          transferInCount: command.transferInCount,
          transferOutCount: command.transferOutCount,
        },
        UUID.generate()
      );

      await this.writeRepository.save(tokenHolder);
    }
  }
}
