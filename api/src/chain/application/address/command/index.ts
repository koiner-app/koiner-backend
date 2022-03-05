import { CreateAddressHandler } from './create-address.handler';
import { UpdateAddressStatsHandler } from './update-address-stats.handler';

export { CreateAddressCommand } from './create-address.command';
export { UpdateAddressStatsCommand } from './update-address-stats.command';

export default {
  handlers: [CreateAddressHandler, UpdateAddressStatsHandler],
};
