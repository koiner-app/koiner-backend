import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChainCommand } from '@koiner/chain/application/chain/command/dto/update-chain.command';
import { ChainWriteRepository } from '@koiner/chain/domain';
import { BlockTopology, KoinosId } from '@koiner/domain';

@CommandHandler(UpdateChainCommand)
export class UpdateChainHandler implements ICommandHandler<UpdateChainCommand> {
  constructor(private readonly writeRepository: ChainWriteRepository) {}

  async execute(command: UpdateChainCommand): Promise<void> {
    const chain = await this.writeRepository.findOneByIdOrThrow(
      command.chainId,
    );

    chain.update({
      headTopology: new BlockTopology({
        id: new KoinosId(command.headTopologyId),
        height: command.headTopologyHeight,
        previous: command.headTopologyPrevious,
      }),
      lastIrreversibleBlock: command.lastIrreversibleBlock,
      lastSyncedBlock: command.lastSyncedBlock,
      syncing: command.syncing,
      stopped: command.stopped ?? false,
    });

    await this.writeRepository.save(chain);
  }
}
