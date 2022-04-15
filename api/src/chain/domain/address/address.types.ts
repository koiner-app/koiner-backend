import { AddressStatistics } from '@koiner/chain/domain';

export interface CreateAddressProps {
  isProducer: boolean;
  stats: AddressStatistics;
}

export type AddressProps = CreateAddressProps;
