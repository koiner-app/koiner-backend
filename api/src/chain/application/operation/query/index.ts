import { OperationHandler } from './operation.handler';
import { OperationsHandler } from './operations.handler';

export { OperationQuery } from './operation.query';
export { OperationsQuery } from './operations.query';

export default {
  handlers: [OperationHandler, OperationsHandler],
};
