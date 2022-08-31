import { KoinosAddressId, KoinosId } from '@koiner/domain';

export enum EventParentType {
  block = 'block',
  transaction = 'transaction',
}

export interface CreateEventProps {
  parentId: KoinosId;
  parentType: EventParentType;
  sequence?: number;
  contractId?: KoinosAddressId;
  name: string;
  data?: string;
  impacted?: KoinosAddressId[];
  timestamp: number;
}

export type EventProps = CreateEventProps;
