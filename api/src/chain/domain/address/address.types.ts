import { AddressStatistics } from '@koiner/chain/domain';

export interface CreateAddressProps {
  isProducer: boolean;
  rewardsReceived: number;
  stats: AddressStatistics;
}

export type AddressProps = CreateAddressProps;
