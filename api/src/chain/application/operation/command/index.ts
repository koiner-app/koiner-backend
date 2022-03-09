import { CreateContractOperationHandler } from './create-contract-operation.handler';
import { CreateUploadContractOperationHandler } from './create-upload-contract-operation.handler';
import { CreateSystemCallOperationHandler } from './create-system-call-operation.handler';
import { CreateSystemContractOperationHandler } from './create-system-contract-operation.handler';

export { CreateContractOperationCommand } from './dto/create-contract-operation.command';
export { CreateUploadContractOperationCommand } from './dto/create-upload-contract-operation.command';
export { CreateSystemCallOperationCommand } from './dto/create-system-call-operation.command';
export { CreateSystemContractOperationCommand } from './dto/create-system-contract-operation.command';

export default {
  handlers: [
    CreateContractOperationHandler,
    CreateUploadContractOperationHandler,
    CreateSystemCallOperationHandler,
    CreateSystemContractOperationHandler,
  ],
};
