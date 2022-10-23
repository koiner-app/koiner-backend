import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockProductionStatsProps {
  contractId: KoinosAddressId;
  rewarded: number;
  burned: number;
}

export interface BlockProductionStatsProps
  extends CreateBlockProductionStatsProps {
  blocksProduced: number;
  roi: number;
}
