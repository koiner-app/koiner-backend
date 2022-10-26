import { EmitChainAddressUsedQueueEvents } from './address/emit-chain-address-used-queue-events';
import { EmitContractsAddressUsedQueueEvents } from './address/emit-contracts-address-used-queue-events';
import { EmitNetworkAddressUsedQueueEvents } from './address/emit-network-address-used-queue-events';
import { EmitTokenizeAddressUsedQueueEvents } from './address/emit-tokenize-address-used-queue-events';
import { EmitBlockCreatedFromEventsQueue } from './event/emit-block-created-from-events-queue';
import { EmitTransactionCreatedFromEventsQueue } from './event/emit-transaction-created-from-events-queue';
import { EmitTransactionCreatedFromOperationsQueue } from './operation/emit-transaction-created-from-operations-queue';
import { UpdateChainStatsFromChainEventsQueue } from './stats/update-chain-stats-from-chain-events-queue';
import { EmitBlockWithTxCreatedFromTransactionsQueue } from './transaction/emit-block-with-tx-created-from-transactions-queue';

export const ChainAmqpSubscribeHandlers = [
  // Address
  EmitChainAddressUsedQueueEvents,
  EmitContractsAddressUsedQueueEvents,
  EmitNetworkAddressUsedQueueEvents,
  EmitTokenizeAddressUsedQueueEvents,

  // Event
  EmitBlockCreatedFromEventsQueue,
  EmitTransactionCreatedFromEventsQueue,

  // Operation
  EmitTransactionCreatedFromOperationsQueue,

  // Stats
  UpdateChainStatsFromChainEventsQueue,

  // Transaction
  EmitBlockWithTxCreatedFromTransactionsQueue,
];
