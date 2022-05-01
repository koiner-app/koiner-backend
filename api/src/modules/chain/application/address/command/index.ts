import { CreateOrUpdateAddressHandler } from './create-or-update-address.handler';

export { CreateOrUpdateAddressCommand } from './dto/create-or-update-address.command';

export default {
  handlers: [CreateOrUpdateAddressHandler],
};
