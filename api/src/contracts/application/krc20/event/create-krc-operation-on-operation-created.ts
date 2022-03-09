import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContractOperationCreated } from '@koiner/chain/domain';
import { Contract, Provider, Signer, utils } from 'koilib';
import { CreateKrc20OperationCommand } from '@koiner/contracts/application/krc20/command';

@EventsHandler(ContractOperationCreated)
export class CreateKrcOperationOnOperationCreated
  implements IEventHandler<ContractOperationCreated>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly signer: Signer,
  ) {}

  async handle(event: ContractOperationCreated): Promise<void> {
    try {
      // TODO: Add Contract.type + dispatch event for each type to listen to
      const Krc20Contract = new Contract({
        id: event.contractId,
        abi: utils.Krc20Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const test = utils.encodeBase58(utils.decodeBase64(<string>event.args));

      console.log('test ==========', test);

      const decodedOperation = await Krc20Contract.decodeOperation({
        call_contract: {
          contract_id: event.contractId as any,
          entry_point: event.entryPoint,
          args: event.args as any,
        },
      });

      console.log('decodedOperation', decodedOperation);

      await this.commandBus.execute(
        new CreateKrc20OperationCommand(
          event.operationId,
          decodedOperation.name,
          <string>decodedOperation.args.from,
          <string>decodedOperation.args.to,
          <string>decodedOperation.args.value,
        ),
      );
    } catch (error) {
      console.log('Krc20 operation error', error);
    }
  }
}
