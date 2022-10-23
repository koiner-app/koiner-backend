import { EmitEventsBlockProducerQueue } from './emit-events-block-producer-queue';
import { EmitEventsBlockProductionStatsQueue } from './emit-events-block-production-stats-queue';

export const NetworkAmqpSubscribeHandlers = [
  EmitEventsBlockProducerQueue,
  EmitEventsBlockProductionStatsQueue,
];
