export interface CreateAddressProps {
  isProducer: boolean;
  isContract: boolean;
  isTokenContract: boolean;
}

export interface AddressProps extends CreateAddressProps {
  timestamp: number;
}
