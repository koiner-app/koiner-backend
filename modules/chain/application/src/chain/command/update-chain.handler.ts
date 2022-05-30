import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockTopology, KoinosId } from '@koiner/domain';
import { ChainWriteRepository } from '@koiner/chain/domain';
import { UpdateChainCommand } from './dto/update-chain.command';

@CommandHandler(UpdateChainCommand)
export class UpdateChainHandler implements ICommandHandler<UpdateChainCommand> {
  constructor(private readonly writeRepository: ChainWriteRepository) {}

  async execute(command: UpdateChainCommand): Promise<void> {
    const chain = await this.writeRepository.findOneByIdOrThrow(command.id);

    chain.update({
      headTopology: new BlockTopology({
        id: new KoinosId(command.headTopology.id),
        height: command.headTopology.height,
        previous: command.headTopology.previous,
      }),
      lastIrreversibleBlock: command.lastIrreversibleBlock,
      lastSyncedBlock: command.lastSyncedBlock,
      syncing: command.syncing,
      stopped: command.stopped ?? false,
    });

    await this.writeRepository.save(chain);
  }
}
