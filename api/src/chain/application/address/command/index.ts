import { CreateOrUpdateAddressHandler } from './create-or-update-address.handler';
import { UpdateAddressStatsHandler } from './update-address-stats.handler';

export { CreateOrUpdateAddressCommand } from './dto/create-or-update-address.command';
export { UpdateAddressStatsCommand } from './dto/update-address-stats.command';

export default {
  handlers: [CreateOrUpdateAddressHandler, UpdateAddressStatsHandler],
};
