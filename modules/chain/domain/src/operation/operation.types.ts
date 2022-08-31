import { KoinosId } from '@koiner/domain';

export enum OperationType {
  systemCall = 'systemCall',
  systemContract = 'systemContract',
  uploadContract = 'uploadContract',
  contractOperation = 'contractOperation',
}

export interface CreateOperationProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  type: OperationType;
  timestamp: number;
}

export type OperationProps = CreateOperationProps;
