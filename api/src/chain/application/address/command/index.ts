import { CreateAddressHandler } from './create-address.handler';
import { UpdateAddressStatsHandler } from './update-address-stats.handler';

export { CreateAddressCommand } from './dto/create-address.command';
export { UpdateAddressStatsCommand } from './dto/update-address-stats.command';

export default {
  handlers: [CreateAddressHandler, UpdateAddressStatsHandler],
};
