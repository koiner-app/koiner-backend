import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenHolder,
  TokenHolderWriteRepository,
} from '@koiner/tokenize/domain';
import { UpdateTokenHolderCommand } from './dto/update-token-holder.command';
import { koinosConfig } from '@koinos/jsonrpc';

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
      /**
       * Allow holder for new contract VHP version to proceed with balances of VHP 1
       */
      if (command.contractId === koinosConfig.contracts.vhp) {
        const oldVhpTokenHolder = await this.writeRepository.findOne(
          command.addressId,
          koinosConfig.contracts.vhp1
        );

        if (oldVhpTokenHolder) {
          // Use old holder values
          tokenHolder = TokenHolder.create(
            {
              addressId: new KoinosAddressId(command.addressId),
              contractId: new KoinosAddressId(command.contractId),
              balance: oldVhpTokenHolder.balance + command.amountChanged,
              burnCount: oldVhpTokenHolder.burnCount + (command.burnCount ?? 0),
              mintCount: oldVhpTokenHolder.mintCount + (command.mintCount ?? 0),
              transferInCount:
                oldVhpTokenHolder.transferInCount +
                (command.transferInCount ?? 0),
              transferOutCount:
                oldVhpTokenHolder.transferOutCount +
                (command.transferOutCount ?? 0),
            },
            UUID.generate()
          );
        } else {
          // Create new holder
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
        }
      } else {
        // Not VHP: create new holder
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
      }

      await this.writeRepository.save(tokenHolder);
    }
  }
}
