import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContractCreated } from '@koiner/chain/domain';
import { Contract, Provider, Signer, utils } from 'koilib';
import { CreateKrc20ContractCommand } from '@koiner/contracts/application/krc20/command';

@EventsHandler(ContractCreated)
export class CreateKrcContractOnContractCreated
  implements IEventHandler<ContractCreated>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly signer: Signer,
  ) {}

  async handle(event: ContractCreated): Promise<void> {
    try {
      // TODO: Abstract contract checker
      const Krc20Contract = new Contract({
        id: event.contractId,
        abi: utils.Krc20Abi,
        provider: this.provider,
        signer: this.signer,
      });

      const krc20Values = {
        name: undefined,
        symbol: undefined,
        decimals: undefined,
        // totalSupply: undefined,
        balanceOf: undefined,
      };

      for (const [key, value] of Object.entries(krc20Values)) {
        const result = await Krc20Contract.functions[key]();

        if (result) {
          krc20Values[key] = result.result.value;
        }
      }

      if (krc20Values.name && krc20Values.symbol && krc20Values.decimals) {
        console.log(
          'upload_contract:',
          krc20Values.name,
          krc20Values.symbol,
          krc20Values.decimals,
          // krc20Values.totalSupply,
          krc20Values.balanceOf,
        );

        await this.commandBus.execute(
          new CreateKrc20ContractCommand(
            event.contractId,
            event.blockHeight,
            event.transactionId,
            event.operationIndex,
            <string>krc20Values.name,
            <string>krc20Values.symbol,
            <number>krc20Values.decimals,
          ),
        );
      }
    } catch (error) {
      console.log('Not Krc20, error', error);
      // not Krc20 compliant or already exists
    }
  }
}
