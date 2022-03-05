import { AddressHandler } from './address.handler';
import { AddressesHandler } from './addresses.handler';

export { AddressQuery } from './address.query';
export { AddressesQuery } from './addresses.query';

export default {
  handlers: [AddressHandler, AddressesHandler],
};
