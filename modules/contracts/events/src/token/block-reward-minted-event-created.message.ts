import { TokenEventCreatedMessage } from './token-event-created.message';

export class BlockRewardMintedEventCreatedMessage extends TokenEventCreatedMessage {
  static override routingKey = 'contracts.token.block_reward_minted';
}
