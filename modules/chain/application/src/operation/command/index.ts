import { CreateOperationHandler } from './create-operation.handler';
import { CreateSystemCallOperationHandler } from './create-system-call-operation.handler';
import { CreateSystemContractOperationHandler } from './create-system-contract-operation.handler';
import { CreateUploadContractOperationHandler } from './create-upload-contract-operation.handler';
import { UndoOperationsByBlockHeightHandler } from './undo-operations-by-block-height.handler';

export { CreateOperationCommand } from './dto/create-operation.command';
export { CreateSystemCallOperationCommand } from './dto/create-system-call-operation.command';
export { CreateSystemContractOperationCommand } from './dto/create-system-contract-operation.command';
export { CreateUploadContractOperationCommand } from './dto/create-upload-contract-operation.command';
export { UndoOperationsByBlockHeightCommand } from './dto/undo-operations-by-block-height.command';

export const OperationCommandHandlers = [
  CreateOperationHandler,
  CreateSystemCallOperationHandler,
  CreateSystemContractOperationHandler,
  CreateUploadContractOperationHandler,
  UndoOperationsByBlockHeightHandler,
];
