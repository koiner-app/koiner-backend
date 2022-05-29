import { CommandBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koiner/jsonrpc';
import { CreateSystemCallOperationForNewOperation } from './operation/create-system-call-operation-for-new-operation';
import { CreateSystemContractOperationForNewOperation } from './operation/create-system-contract-operation-for-new-operation';
import { CreateUploadOperationForNewOperation } from './operation/create-upload-operation-for-new-operation';

export default [
  {
    provide: CreateSystemCallOperationForNewOperation,
    useFactory: (
      commandBus: CommandBus,
      rawBlocksService: RawBlocksService
    ): CreateSystemCallOperationForNewOperation => {
      const eventHandler = new CreateSystemCallOperationForNewOperation(
        commandBus,
        rawBlocksService
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
      rawBlocksService: RawBlocksService
    ): CreateSystemContractOperationForNewOperation => {
      const eventHandler = new CreateSystemContractOperationForNewOperation(
        commandBus,
        rawBlocksService
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
      rawBlocksService: RawBlocksService
    ): CreateUploadOperationForNewOperation => {
      const eventHandler = new CreateUploadOperationForNewOperation(
        commandBus,
        rawBlocksService
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [CommandBus, RawBlocksService],
  },
];
