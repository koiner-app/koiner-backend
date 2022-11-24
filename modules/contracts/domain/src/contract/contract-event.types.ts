import { EventParentType, KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/standards';

export interface CreateContractEventProps {
  blockHeight: number;
  parentId: KoinosId;
  parentType: EventParentType;
  sequence?: number;
  contractId: KoinosAddressId;
  contractStandardType?: ContractStandardType;
  name: string;
  data?: string;
  decodedData?: Record<string, any>;
  impacted?: KoinosAddressId[];
  timestamp: number;
}

export type ContractEventProps = CreateContractEventProps;
