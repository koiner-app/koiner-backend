import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenContractWriteRepository } from '@koiner/tokenize/domain';
import { UpdateTokenContractCommand } from './dto/update-token-contract.command';

@CommandHandler(UpdateTokenContractCommand)
export class UpdateTokenContractHandler
  implements ICommandHandler<UpdateTokenContractCommand>
{
  constructor(private readonly writeRepository: TokenContractWriteRepository) {}

  async execute(command: UpdateTokenContractCommand): Promise<void> {
    const tokenContract = await this.writeRepository.findOneByIdOrThrow(
      command.contractId
    );

    tokenContract.update({
      mintedTokens: command.mintedTokens,
      burnedTokens: command.burnedTokens,
    });

    await this.writeRepository.save(tokenContract);
  }
}
