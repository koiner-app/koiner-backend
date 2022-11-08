import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockProductionStatsProps {
  contractId: KoinosAddressId;
  burnedTotal: number;
  mintedTotal: number;
}

export interface BlockProductionStatsProps
  extends CreateBlockProductionStatsProps {
  rewarded: number;
  producerCount: number;
  blocksProduced: number;
  roi: number;
}
