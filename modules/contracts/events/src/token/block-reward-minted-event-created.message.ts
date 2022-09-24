import { TokenEventCreatedMessage } from '@koiner/tokenize/events';

export class BlockRewardMintedEventCreatedMessage extends TokenEventCreatedMessage {
  static override routingKey = 'contracts.token.block_reward_minted';
}
