import { ItemQuery, SearchQuery } from '@appvise/domain';

export class AddressQuery extends ItemQuery {}
export class AddressesQuery extends SearchQuery {}

import { AddressHandler } from './address.handler';
import { AddressesHandler } from './addresses.handler';

export default {
  handlers: [AddressHandler, AddressesHandler],
};
