import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenContract,
  TokenContractWriteRepository,
} from '@koiner/contracts/domain';
import { CreateTokenContractCommand } from './dto/create-token-contract.command';

@CommandHandler(CreateTokenContractCommand)
export class CreateTokenContractHandler
  implements ICommandHandler<CreateTokenContractCommand>
{
  constructor(private readonly writeRepository: TokenContractWriteRepository) {}

  async execute(command: CreateTokenContractCommand): Promise<void> {
    const contract = TokenContract.create(
      {
        name: command.name,
        symbol: command.symbol,
        decimals: command.decimals,
      },
      new KoinosAddressId(command.id),
    );

    await this.writeRepository.save(contract);
  }
}
