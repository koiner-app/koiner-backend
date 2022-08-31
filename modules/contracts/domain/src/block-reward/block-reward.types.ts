import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockRewardProps {
  blockHeight: number;
  producerId: KoinosAddressId;
  contractId: KoinosAddressId;
  value: number;
  burnedContractId?: KoinosAddressId;
  burnerId?: KoinosAddressId;
  burnedValue?: number;
  roi?: number;
  timestamp: number;
}

export type BlockRewardProps = CreateBlockRewardProps;
