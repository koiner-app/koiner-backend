import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import {
  ContractCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';
import {
  ContractStandardService,
  CreateTokenContractCommand,
} from '@koiner/contracts/application';

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
        new CreateTokenContractCommand({
          id: event.aggregateId,
          name: <string>contractValues.name,
          symbol: <string>contractValues.symbol,
          decimals: <number>contractValues.decimals,
        }),
      );

      this.logger.debug(
        `Done creating TokenContract ${event.aggregateId}`,
        'CreateKrcContractOnContractCreated',
      );
    }
  }
}
