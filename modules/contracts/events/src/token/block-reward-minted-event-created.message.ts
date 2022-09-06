import { TokenEventCreatedMessage } from './token-event-created.message';

export class BlockRewardMintedEventCreatedMessage extends TokenEventCreatedMessage {
  static override routingKey = 'contracts.token.vhp_event.created';
}
