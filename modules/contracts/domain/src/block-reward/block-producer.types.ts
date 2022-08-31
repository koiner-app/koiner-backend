import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockProducerProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
}

export type BlockProducerProps = CreateBlockProducerProps;
