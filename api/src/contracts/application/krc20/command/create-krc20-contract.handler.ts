import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Krc20Contract,
  Krc20ContractWriteRepository,
} from '@koiner/contracts/domain';
import { CreateKrc20ContractCommand } from './dto/create-krc20-contract.command';
import { KoinosAddressId, KoinosId } from '@koiner/domain';

@CommandHandler(CreateKrc20ContractCommand)
export class CreateKrc20ContractHandler
  implements ICommandHandler<CreateKrc20ContractCommand>
{
  constructor(private readonly writeRepository: Krc20ContractWriteRepository) {}

  async execute(command: CreateKrc20ContractCommand): Promise<void> {
    const contract = Krc20Contract.create(
      {
        blockHeight: command.blockHeight,
        transactionId: new KoinosId(command.transactionId),
        operationIndex: command.operationIndex,
        name: command.name,
        symbol: command.symbol,
        decimals: command.decimals,
      },
      new KoinosAddressId(command.id),
    );

    await this.writeRepository.save(contract);
  }
}
