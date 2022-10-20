import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  OperationReadRepository,
  OperationType,
  OperationWriteRepository,
  SystemCallOperationWriteRepository,
  SystemContractOperationWriteRepository,
  UploadContractOperationWriteRepository,
} from '@koiner/chain/domain';
import { UndoOperationsByBlockHeightCommand } from './dto/undo-operations-by-block-height.command';

@CommandHandler(UndoOperationsByBlockHeightCommand)
export class UndoOperationsByBlockHeightHandler
  implements ICommandHandler<UndoOperationsByBlockHeightCommand>
{
  constructor(
    private readonly readRepository: OperationReadRepository,
    private readonly writeRepository: OperationWriteRepository,
    private readonly systemCallWriteRepo: SystemCallOperationWriteRepository,
    private readonly systemContractWriteRepo: SystemContractOperationWriteRepository,
    private readonly uploadContractWriteRepo: UploadContractOperationWriteRepository
  ) {}

  async execute(command: UndoOperationsByBlockHeightCommand): Promise<void> {
    const operations = await this.readRepository.find({
      first: 100,
      filter: {
        OR: command.blockHeights.map((blockHeight) => {
          return {
            blockHeight: { equals: blockHeight },
          };
        }),
      },
    });

    for (const operation of operations.results) {
      // Remove SystemCall operation
      if (operation.item.type === OperationType.systemCall) {
        const systemCallOperation = await this.systemCallWriteRepo.findOneById(
          operation.item.id.value
        );

        if (systemCallOperation) {
          await this.systemCallWriteRepo.delete(systemCallOperation);
        }
      }

      // Remove SystemContract operation
      if (operation.item.type === OperationType.systemContract) {
        const systemContractOperation =
          await this.systemContractWriteRepo.findOneById(
            operation.item.id.value
          );

        if (systemContractOperation) {
          await this.systemContractWriteRepo.delete(systemContractOperation);
        }
      }

      // Remove UploadContract operation
      if (operation.item.type === OperationType.uploadContract) {
        const uploadContractOperation =
          await this.uploadContractWriteRepo.findOneById(
            operation.item.id.value
          );

        if (uploadContractOperation) {
          await this.uploadContractWriteRepo.delete(uploadContractOperation);
        }
      }

      await this.writeRepository.delete(operation.item);
    }
  }
}
