import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContractOperationCreated } from '@koiner/chain/domain';
import { CreateKrc20OperationCommand } from '@koiner/contracts/application/krc20/command';
import { ContractStandardType } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

@EventsHandler(ContractOperationCreated)
export class CreateKrcOperationOnOperationCreated
  implements IEventHandler<ContractOperationCreated>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService,
  ) {}

  async handle(event: ContractOperationCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.krc20) {
      return;
    }

    try {
      const decodedOperation =
        await this.contractStandardService.decodeOperation(
          event.contractStandardType,
          event.contractId,
          event.entryPoint,
          event.args,
        );

      await this.commandBus.execute(
        new CreateKrc20OperationCommand(
          event.operationId,
          event.contractId,
          decodedOperation.name,
          <string>decodedOperation.args.to,
          parseInt(<string>decodedOperation.args.value),
          <string>decodedOperation.args.from,
        ),
      );
    } catch (error) {
      console.log('Krc20 operation error', error);
    }
  }
}
