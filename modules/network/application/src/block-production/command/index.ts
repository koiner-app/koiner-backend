import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { UpdateBlockProducerHandler } from './update-block-producer.handler';

export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { UpdateBlockProducerCommand } from './dto/update-block-producer.command';

export const BlockProductionCommandHandlers = [
  CreateBlockRewardHandler,
  UpdateBlockProducerHandler,
];
