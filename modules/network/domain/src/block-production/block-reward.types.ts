import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateBlockRewardProps {
  blockId: KoinosId;
  blockHeight: number;
  producerId: KoinosAddressId;
  mintedValue: number;
  burnedValue: number;
  timestamp: number;
}

export interface BlockRewardProps extends CreateBlockRewardProps {
  value: number;
  roi: number;
}
