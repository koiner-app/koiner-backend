import { EventParentType, KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateTokenEventProps {
  blockHeight: number;
  parentId: KoinosId;
  parentType: EventParentType;
  sequence?: number;
  contractId: KoinosAddressId;
  name: string;
  from?: KoinosAddressId;
  to?: KoinosAddressId;
  value: number;
  timestamp: number;
}

export type TokenEventProps = CreateTokenEventProps;
