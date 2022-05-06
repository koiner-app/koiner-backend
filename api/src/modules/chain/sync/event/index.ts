import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { CreateSystemCallOperationForNewOperation } from './operation/create-system-call-operation-for-new-operation';
import { CreateSystemContractOperationForNewOperation } from './operation/create-system-contract-operation-for-new-operation';
import { CreateUploadOperationForNewOperation } from './operation/create-upload-operation-for-new-operation';
import { GraphqlSubscriptionForNewBlock } from '@koiner/chain/sync/event/operation/graphql-subscription-for-new-block';
import { PubSubEngine } from '@koiner/pubsub-engine';

export default [
  {
    provide: CreateSystemCallOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): CreateSystemCallOperationForNewOperation => {
      const eventHandler = new CreateSystemCallOperationForNewOperation(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateSystemContractOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): CreateSystemContractOperationForNewOperation => {
      const eventHandler = new CreateSystemContractOperationForNewOperation(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: CreateUploadOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService,
    ): CreateUploadOperationForNewOperation => {
      const eventHandler = new CreateUploadOperationForNewOperation(
        commandBus,
        rawBlocksService,
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },

  {
    provide: GraphqlSubscriptionForNewBlock,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): GraphqlSubscriptionForNewBlock => {
      const eventHandler = new GraphqlSubscriptionForNewBlock(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
