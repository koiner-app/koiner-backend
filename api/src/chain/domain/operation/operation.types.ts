import { KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

export enum OperationType {
  systemCall = 'systemCall',
  systemContractOperation = 'systemContractOperation',
  uploadContract = 'uploadContract',
  contractOperation = 'contractOperation',
  krc20Operation = 'krc20Operation',
}

export interface CreateOperationProps {
  parentId: UUID;
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  type: OperationType;
}

export type OperationProps = CreateOperationProps;