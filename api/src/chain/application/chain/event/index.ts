import { provideEventHandlers } from '@appvise/nestjs-utils';
import { UpdateChainStatsOnAddressCreated } from './update-chain-stats-on-address-created';
import { UpdateChainStatsOnTransactionCreated } from './update-chain-stats-on-transaction-created';

export default [
  ...provideEventHandlers([
    UpdateChainStatsOnAddressCreated,
    UpdateChainStatsOnTransactionCreated,
  ]),
];
