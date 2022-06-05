import { ContractsAmqpPublishHandlers } from './publish';
import { ContractsAmqpSubscribeHandlers } from './subscribe';

export const ContractsAmqpHandlers = [
  ...ContractsAmqpPublishHandlers,
  ...ContractsAmqpSubscribeHandlers,
];
