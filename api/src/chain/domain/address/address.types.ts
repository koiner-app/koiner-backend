import { AddressStatistics } from '@koiner/chain/domain';

export interface CreateAddressProps {
  something?: string;
}

export interface AddressProps extends CreateAddressProps {
  stats: AddressStatistics;
}
