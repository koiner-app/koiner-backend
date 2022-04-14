import { KoinosId } from '@koiner/domain';

export enum OperationType {
  systemCall = 'systemCall',
  systemContractOperation = 'systemContractOperation',
  uploadContract = 'uploadContract',
  contractOperation = 'contractOperation',
}

export interface CreateOperationProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  type: OperationType;
}

export type OperationProps = CreateOperationProps;
