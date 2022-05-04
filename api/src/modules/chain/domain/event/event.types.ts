import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateEventProps {
  transactionId: KoinosId;
  sequence: number;
  contractId?: KoinosAddressId;
  name: string;
  data: string;
  impacted?: KoinosAddressId[];
}

export type EventProps = CreateEventProps;
