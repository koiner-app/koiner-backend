import { EventParentType, KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateEventProps {
  blockHeight: number;
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
