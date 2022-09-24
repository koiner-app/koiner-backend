import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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
      });

      await this.writeRepository.save(tokenHolder);
    } else {
      tokenHolder = TokenHolder.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          balance: command.amountChanged,
        },
        new KoinosAddressId(command.addressId)
      );

      await this.writeRepository.save(tokenHolder);
    }
  }
}
