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
    const Krc20Abi = utils.Krc20Abi;

    // TODO: Remove workaround when koilib is updated.
    Krc20Abi.methods.name.entryPoint = 0x82a3537f;
    Krc20Abi.methods.symbol.entryPoint = 0xb76a7ca1;
    Krc20Abi.methods.decimals.entryPoint = 0xee80fd2f;
    Krc20Abi.methods.totalSupply.entryPoint = 0xb0da3934;
    Krc20Abi.methods.balanceOf.entryPoint = 0x5c721497;
    Krc20Abi.methods.transfer.entryPoint = 0x27f576ca;
    Krc20Abi.methods.mint.entryPoint = 0xdc6f17bb;

    try {
      // TODO: Add Contract.type + dispatch event for each type to listen to
      const Krc20Contract = new Contract({
        id: event.contractId,
        abi: Krc20Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const decodedOperation = await Krc20Contract.decodeOperation({
        call_contract: {
          contract_id: utils.decodeBase58(event.contractId),
          entry_point: event.entryPoint,
          args: event.args as any,
        },
      });

      console.log('decodedOperation', decodedOperation);

      await this.commandBus.execute(
        new CreateKrc20OperationCommand(
          event.operationId,
          decodedOperation.name,
          <string>decodedOperation.args.to,
          <string>decodedOperation.args.value,
          <string>decodedOperation.args.from,
        ),
      );
    } catch (error) {
      console.log('Krc20 operation error', error);
    }
  }
}
