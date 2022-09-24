// import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
// import { DomainEventHandler } from '@appvise/domain';
// import {
//   ContractEventParentType,
//   TokenEventCreated,
// } from '@koiner/contracts/domain';
// import { BlockRewardMintedEventCreatedMessage } from '@koiner/contracts/events';
// import { koinos } from '../../../../config';
//
// export class PublishBlockRewardMintedEvent extends DomainEventHandler {
//   constructor(private readonly amqpConnection: AmqpConnection) {
//     super(TokenEventCreated);
//   }
//
//   async handle(event: TokenEventCreated): Promise<void> {
//     // Publish koin.mint TokenEvent for minted koin of BlockRewards
//     if (
//       event.parentType === ContractEventParentType.block &&
//       event.name === 'mint' &&
//       event.contractId === koinos.koinContractId
//     ) {
//       const message = new BlockRewardMintedEventCreatedMessage({
//         id: event.aggregateId,
//         contractId: event.contractId,
//         name: event.name,
//         from: event.from,
//         to: event.to,
//         value: event.value,
//         timestamp: event.timestamp,
//         publishedAt: Date.now(),
//       });
//
//       await this.amqpConnection.publish(
//         'koiner.contracts.event',
//         BlockRewardMintedEventCreatedMessage.routingKey,
//         message.toString()
//       );
//     }
//   }
// }
