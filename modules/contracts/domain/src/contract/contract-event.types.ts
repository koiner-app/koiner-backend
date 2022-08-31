import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '../contract-standard';

export enum ContractEventParentType {
  block = 'block',
  transaction = 'transaction',
}

export interface CreateContractEventProps {
  parentId: KoinosId;
  parentType: ContractEventParentType;
  sequence?: number;
  contractId: KoinosAddressId;
  contractStandardType?: ContractStandardType;
  name: string;
  data: string;
  impacted?: KoinosAddressId[];
  timestamp: number;
}

export type ContractEventProps = CreateContractEventProps;
