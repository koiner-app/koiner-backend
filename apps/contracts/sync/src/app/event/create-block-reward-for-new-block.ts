import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { Provider, utils } from 'koilib';
import { RawBlocksService } from '@koinos/jsonrpc';
import { CreateOrUpdateAddressCommand } from '@koiner/contracts/application';
import { ContractStandardType } from '@koiner/contracts/domain';
import {
  CreateBlockRewardCommand,
  ContractStandardService,
} from '@koiner/contracts/application';
import { BlockCreatedMessage } from '@koiner/chain/events';
import { koinos } from '../../config';
import * as math from 'mathjs';

@Injectable()
export class CreateBlockRewardForNewBlock {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly rawBlocksService: RawBlocksService,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(BlockCreatedMessage.routingKey, { async: false })
  async handle(event: BlockCreatedMessage): Promise<void> {
    const rawBlock = await this.rawBlocksService.getBlock(event.height);

    if (rawBlock.receipt.events) {
      const mintEvent = rawBlock.receipt.events.find(
        (event) => event.name === 'koin.mint'
      );

      const burnEvent = rawBlock.receipt.events.find(
        (event) => event.name === 'vhp.burn'
      );

      if (mintEvent) {
        // Decode mint event
        const mintOperation =
          await this.contractStandardService.decodeOperation(
            ContractStandardType.token,
            koinos.koinContractId,
            utils.tokenAbi.methods.mint.entry_point,
            mintEvent.data
          );

        const blockProducerId = <string>mintOperation.args.to;
        const producerRewards = parseInt(<string>mintOperation.args.value);

        let burnerId: string | undefined;
        let burnedValue: number | undefined;

        if (burnEvent) {
          // Decode burn event
          const burnOperation =
            await this.contractStandardService.decodeOperation(
              ContractStandardType.token,
              koinos.vhpContractId,
              utils.tokenAbi.methods.burn.entry_point,
              burnEvent.data
            );

          burnerId = <string>burnOperation.args.from;
          burnedValue = parseInt(<string>burnOperation.args.value);
        }

        // Add address for block producer
        await this.commandBus.execute(
          new CreateOrUpdateAddressCommand({
            id: blockProducerId,
            isProducer: true,
          })
        );

        await this.commandBus.execute(
          new CreateBlockRewardCommand({
            blockHeight: event.height,
            producerId: blockProducerId,
            contractId: koinos.koinContractId,
            value: producerRewards,
            burnedContractId: koinos.vhpContractId,
            burnerId,
            burnedValue,
            roi: burnedValue
              ? (math
                  .chain<number>(producerRewards)
                  .divide(burnedValue)
                  .multiply(100)
                  .subtract(100)
                  .round(5)
                  .done() as number)
              : undefined,
          })
        );
      }
    }
  }
}
