import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import {
  ContractCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { CreateTokenContractCommand } from '@koiner/contracts/application/token/command';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export class CreateTokenContractOnContractCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
    private readonly contractStandardService: ContractStandardService,
  ) {
    super(ContractCreated);
  }

  async handle(event: ContractCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.token) {
      return;
    }
    this.logger.log(
      `Create TokenContract ${event.aggregateId}`,
      'CreateKrcContractOnContractCreated',
    );

    const contractStandardWithValues =
      await this.contractStandardService.getForContract(
        event.aggregateId,
        event.contractStandardType,
      );
    const contractValues = contractStandardWithValues.contractValues;

    if (
      contractValues.name &&
      contractValues.symbol &&
      contractValues.decimals
    ) {
      await this.commandBus.execute(
        new CreateTokenContractCommand(
          event.aggregateId,
          event.blockHeight,
          event.transactionId,
          event.operationIndex,
          <string>contractValues.name,
          <string>contractValues.symbol,
          <number>contractValues.decimals,
        ),
      );

      this.logger.debug(
        `Done creating TokenContract ${event.aggregateId}`,
        'CreateKrcContractOnContractCreated',
      );
    }
  }
}
