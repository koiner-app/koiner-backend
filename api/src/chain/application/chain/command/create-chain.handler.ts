import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Chain, ChainId, ChainWriteRepository } from '@koiner/chain/domain';
import { CreateChainCommand } from './dto/create-chain.command';
import { BlockTopology, KoinosId } from '@koiner/domain';

@CommandHandler(CreateChainCommand)
export class CreateChainHandler implements ICommandHandler<CreateChainCommand> {
  constructor(
    private readonly writeRepository: ChainWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateChainCommand): Promise<void> {
    // if (!(await this.writeRepository.exists(command.id))) {
    const chain = this.eventPublisher.mergeObjectContext(
      Chain.create(
        {
          headTopology: new BlockTopology({
            id: new KoinosId(command.headTopologyId),
            height: command.headTopologyHeight,
            previous: command.headTopologyPrevious,
          }),
          lastIrreversibleBlock: command.lastIrreversibleBlock,
          lastSyncedBlock: command.lastSyncedBlock,
          syncing: command.syncing,
        },
        new ChainId(command.id),
      ),
    );

    await this.writeRepository.save(chain);

    chain.commit();
    // }
  }
}
