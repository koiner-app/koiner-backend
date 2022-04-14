import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Block,
  BlockReceipt,
  BlockWriteRepository,
} from '@koiner/chain/domain';
import { CreateBlockCommand } from './create-block.command';
import { KoinosId } from '@koiner/domain';
import { BlockHeader } from '@koiner/chain/domain';

@CommandHandler(CreateBlockCommand)
export class CreateBlockHandler implements ICommandHandler<CreateBlockCommand> {
  constructor(private readonly writeRepository: BlockWriteRepository) {}

  async execute(command: CreateBlockCommand): Promise<void> {
    const block = Block.create(
      {
        header: new BlockHeader(command.header),
        transactionCount: command.transactionCount,
        signature: command.signature,
        receipt: new BlockReceipt(command.receipt),
      },
      new KoinosId(command.id),
    );

    await this.writeRepository.save(block);
  }
}
