import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosId } from '@koiner/domain';
import {
  Block,
  BlockHeader,
  BlockReceipt,
  BlockWriteRepository,
} from '@koiner/chain/domain';
import { CreateBlockCommand } from './dto/create-block.command';

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
      new KoinosId(command.id)
    );

    await this.writeRepository.save(block);
  }
}
