import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import { Krc20OperationCreated } from '@koiner/contracts/domain';
import { UpdateKrc20ContractStatsCommand } from '../command';

export class UpdateKrc20ContractStatsOnKrc20OperationCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {
    super(Krc20OperationCreated);
  }

  async handle(event: Krc20OperationCreated): Promise<void> {
    this.logger.log(
      `${event.contractId}, ${event.value}, ${event.name}`,
      'UpdateKrc20ContractStatsOnKrc20OperationCreated',
    );

    await this.commandBus.execute(
      new UpdateKrc20ContractStatsCommand(event.contractId, {
        operationCount: 1,
        mintCount: event.name === 'mint' ? 1 : undefined,
        transferCount: event.name === 'transfer' ? 1 : undefined,
      }),
    );
  }
}
