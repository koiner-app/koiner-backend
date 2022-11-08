import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockProducerProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
  mintedTotal: number;
  burnedTotal: number;
}

export interface BlockProducerProps extends CreateBlockProducerProps {
  blocksProduced: number;
  roi: number;
}
