import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateBlockRewardProps {
  blockId: KoinosId;
  blockHeight: number;
  producerId: KoinosAddressId;
  value: number;
  burnedValue: number;
  timestamp: number;
}

export interface BlockRewardProps extends CreateBlockRewardProps {
  roi: number;
}
