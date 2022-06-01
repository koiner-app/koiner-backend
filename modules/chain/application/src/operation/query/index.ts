import { ItemQuery, SearchQuery } from '@appvise/domain';

export class OperationQuery extends ItemQuery {}
export class OperationsQuery extends SearchQuery {}
export class SystemCallOperationsQuery extends SearchQuery {}
export class SystemContractOperationsQuery extends SearchQuery {}
export class UploadContractOperationsQuery extends SearchQuery {}

import { OperationHandler } from './operation.handler';
import { OperationsHandler } from './operations.handler';
import { SystemCallOperationsHandler } from './system-call-operations.handler';
import { SystemContractOperationsHandler } from './system-contract-operations.handler';
import { UploadContractOperationsHandler } from './upload-contract-operations.handler';

export const OperationQueryHandlers = [
  OperationHandler,
  OperationsHandler,
  SystemCallOperationsHandler,
  SystemContractOperationsHandler,
  UploadContractOperationsHandler,
];
