import { CreateContractOperationHandler } from './create-contract-operation.handler';

export { CreateContractOperationCommand } from './dto/create-contract-operation.command';

export default {
  handlers: [CreateContractOperationHandler],
};
