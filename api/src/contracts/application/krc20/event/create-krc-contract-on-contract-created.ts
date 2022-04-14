import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import {
  ContractCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { CreateKrc20ContractCommand } from '@koiner/contracts/application/krc20/command';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export class CreateKrcContractOnContractCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
    private readonly contractStandardService: ContractStandardService,
  ) {
    super(ContractCreated);
  }

  async handle(event: ContractCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.krc20) {
      return;
    }

    this.logger.log(
      `Create Krc20Contract ${event.aggregateId}`,
      'CreateKrcContractOnContractCreated',
    );

    const contractStandardWithValues =
      await this.contractStandardService.getForContract(
        event.aggregateId,
        event.contractStandardType,
      );
    const contractValues = contractStandardWithValues.contractValues;

    this.logger.log(
      `Create Krc20Contract . contractStandardWithValues`,
      'CreateKrcContractOnContractCreated',
    );

    if (
      contractValues.name &&
      contractValues.symbol &&
      contractValues.decimals
    ) {
      await this.commandBus.execute(
        new CreateKrc20ContractCommand(
          event.aggregateId,
          event.blockHeight,
          event.transactionId,
          event.operationIndex,
          <string>contractValues.name,
          <string>contractValues.symbol,
          <number>contractValues.decimals,
        ),
      );

      this.logger.log(
        `Done creating Krc20Contract ${event.aggregateId}`,
        'CreateKrcContractOnContractCreated',
      );
    }
  }
}
