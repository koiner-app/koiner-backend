import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import { Krc20TokensMinted } from '@koiner/contracts/domain';
import { UpdateKrc20TotalSupplyCommand } from '../command';

export class UpdateTotalSupplyOnKrc20TokensMinted extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {
    super(Krc20TokensMinted);
  }

  async handle(event: Krc20TokensMinted): Promise<void> {
    this.logger.log(
      `${event.contractId}, ${event.value}`,
      'UpdateTotalSupplyOnKrc20TokensMinted',
    );

    await this.commandBus.execute(
      new UpdateKrc20TotalSupplyCommand(event.contractId, event.value),
    );
  }
}
