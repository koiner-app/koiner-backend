import { UpdateBlockProducerOnBlockRewardCreated } from './update-block-producer-on-block-reward-created';
import { provideEventHandler } from '@koiner/nestjs-utils';

export const BlockRewardEventHandlers = [
  provideEventHandler(UpdateBlockProducerOnBlockRewardCreated),
];
