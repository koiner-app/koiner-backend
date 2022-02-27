import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Block, BlockWriteRepository } from '@koiner/chain/domain';
import { CreateBlockCommand } from './create-block.command';
import { KoinosId } from '@koiner/domain';
import { BlockHeader } from '@koiner/chain/domain';

@CommandHandler(CreateBlockCommand)
export class CreateBlockHandler implements ICommandHandler<CreateBlockCommand> {
  constructor(
    private readonly writeRepository: BlockWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateBlockCommand): Promise<void> {
    const block = this.eventPublisher.mergeObjectContext(
      await Block.create(
        {
          header: new BlockHeader({
            previous: command.previous,
            height: command.height,
            timestamp: command.timestamp,
            previousStateMerkleRoot: command.previousStateMerkleRoot,
            transactionMerkleRoot: command.transactionMerkleRoot,
            signer: command.signer,
          }),
          transactionCount: command.transactionCount,
          signature: command.signature,
        },
        command.id ? new KoinosId(command.id) : undefined,
      ),
    );

    await this.writeRepository.save(block);

    block.commit();
  }
}
