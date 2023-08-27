import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenContract,
  TokenContractWriteRepository,
} from '@koiner/tokenize/domain';
import { CreateTokenContractCommand } from './dto/create-token-contract.command';
import { koinosConfig } from '@koinos/jsonrpc';

@CommandHandler(CreateTokenContractCommand)
export class CreateTokenContractHandler
  implements ICommandHandler<CreateTokenContractCommand>
{
  constructor(private readonly writeRepository: TokenContractWriteRepository) {}

  async execute(command: CreateTokenContractCommand): Promise<void> {
    // Only add new contracts (not updates)
    if (await this.writeRepository.existsById(command.id)) {
      return;
    }

    /**
     * Allow new contract VHP version to proceed with values of VHP 1
     */
    if (command.id === koinosConfig.contracts.vhp) {
      const vhp1Contract = await this.writeRepository.findOneById(
        koinosConfig.contracts.vhp1
      );

      if (vhp1Contract) {
        const contract = TokenContract.create(
          {
            name: command.name,
            symbol: command.symbol,
            decimals: command.decimals,
            timestamp: command.timestamp,
            totalSupply: vhp1Contract.totalSupply,
            burnCount: vhp1Contract.burnCount,
            mintCount: vhp1Contract.mintCount,
            transferCount: vhp1Contract.transferCount,
          },
          new KoinosAddressId(command.id)
        );

        await this.writeRepository.save(contract);
      } else {
        const contract = TokenContract.create(
          {
            name: command.name,
            symbol: command.symbol,
            decimals: command.decimals,
            timestamp: command.timestamp,
          },
          new KoinosAddressId(command.id)
        );

        await this.writeRepository.save(contract);
      }
    } else {
      const contract = TokenContract.create(
        {
          name: command.name,
          symbol: command.symbol,
          decimals: command.decimals,
          timestamp: command.timestamp,
        },
        new KoinosAddressId(command.id)
      );

      await this.writeRepository.save(contract);
    }
  }
}
