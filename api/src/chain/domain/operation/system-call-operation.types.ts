import { KoinosAddressId } from '@koiner/domain';

export interface CreateSystemCallOperationProps {
  contractId: KoinosAddressId;
  callId: number;
}

export type SystemCallOperationProps = CreateSystemCallOperationProps;
