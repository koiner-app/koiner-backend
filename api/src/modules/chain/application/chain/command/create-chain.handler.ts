import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Chain, ChainId, ChainWriteRepository } from '@koiner/chain/domain';
import { CreateChainCommand } from './dto/create-chain.command';
import { BlockTopology, KoinosId } from '@koiner/domain';

@CommandHandler(CreateChainCommand)
export class CreateChainHandler implements ICommandHandler<CreateChainCommand> {
  constructor(private readonly writeRepository: ChainWriteRepository) {}

  async execute(command: CreateChainCommand): Promise<void> {
    // TODO: Add exists check
    // if (!(await this.writeRepository.exists(command.id))) {
    const chain = Chain.create(
      {
        headTopology: new BlockTopology({
          id: new KoinosId(command.headTopology.id),
          height: command.headTopology.height,
          previous: command.headTopology.previous,
        }),
        lastIrreversibleBlock: command.lastIrreversibleBlock,
        lastSyncedBlock: command.lastSyncedBlock,
        syncing: command.syncing,
      },
      new ChainId(command.id),
    );

    await this.writeRepository.save(chain);
    // }
  }
}
