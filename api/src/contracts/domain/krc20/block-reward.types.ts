import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockRewardProps {
  blockHeight: number;
  producerId: KoinosAddressId;
  value: number;
  contractId: KoinosAddressId;
}

export type BlockRewardProps = CreateBlockRewardProps;
