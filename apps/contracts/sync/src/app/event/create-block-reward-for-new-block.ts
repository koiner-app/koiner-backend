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

      if (mintEvent) {
        // // Decode mint event
        const mintOperation =
          await this.contractStandardService.decodeOperation(
            ContractStandardType.token,
            koinos.koinContractId,
            utils.tokenAbi.methods.mint.entryPoint,
            mintEvent.data
          );

        const blockProducerId = <string>mintOperation.args.to;
        const producerRewards = parseInt(<string>mintOperation.args.value);

        // Add address for block producer
        await this.commandBus.execute(
          new CreateOrUpdateAddressCommand({
            id: blockProducerId,
            producedBlock: true,
          })
        );

        await this.commandBus.execute(
          new CreateBlockRewardCommand({
            blockHeight: event.height,
            producerId: blockProducerId,
            value: producerRewards,
            contractId: koinos.koinContractId,
          })
        );
      }
    }
  }
}
