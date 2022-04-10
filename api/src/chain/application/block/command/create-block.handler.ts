import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  Block,
  BlockReceipt,
  BlockWriteRepository,
} from '@koiner/chain/domain';
import { CreateBlockCommand } from './create-block.command';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { BlockHeader } from '@koiner/chain/domain';

@CommandHandler(CreateBlockCommand)
export class CreateBlockHandler implements ICommandHandler<CreateBlockCommand> {
  constructor(
    private readonly writeRepository: BlockWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateBlockCommand): Promise<void> {
    const block = this.eventPublisher.mergeObjectContext(
      Block.create(
        {
          header: new BlockHeader(command.header),
          transactionCount: command.transactionCount,
          signature: command.signature,
          producerId: new KoinosAddressId(command.producer.id),
          producerRewards: command.producer.rewards,
          receipt: new BlockReceipt(command.receipt),
        },
        new KoinosId(command.id),
      ),
    );

    await this.writeRepository.save(block);

    block.commit();
  }
}
