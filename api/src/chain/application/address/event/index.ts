import { provideEventHandlers } from '@appvise/nestjs-utils';
import { UpdateAddressStatsOnTransactionCreated } from './update-address-stats-on-transaction-created';

export default [
  ...provideEventHandlers([UpdateAddressStatsOnTransactionCreated]),
];
