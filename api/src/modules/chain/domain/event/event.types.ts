import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/domain';

export interface CreateEventProps {
  transactionId: KoinosId;
  sequence: number;
  contractId: KoinosAddressId;
  contractStandardType?: ContractStandardType;
  name: string;
  data: string;
  impacted: KoinosAddressId[];
}

export type EventProps = CreateEventProps;
