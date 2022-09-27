import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateBlockRewardProps {
  blockId: KoinosId;
  blockHeight: number;
  producerId: KoinosAddressId;
  value: number;
  burnerId?: KoinosAddressId;
  burnedValue?: number;
  roi?: number;
  timestamp: number;
}

export type BlockRewardProps = CreateBlockRewardProps;
