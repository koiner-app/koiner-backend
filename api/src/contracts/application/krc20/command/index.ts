import { CreateKrc20ContractHandler } from './create-krc20-contract.handler';
import { CreateKrc20OperationHandler } from './create-krc20-operation.handler';

export { CreateKrc20ContractCommand } from './create-krc20-contract.command';
export { CreateKrc20OperationCommand } from './create-krc20-operation.command';

export default {
  handlers: [CreateKrc20ContractHandler, CreateKrc20OperationHandler],
};
