import { TokenEventCreatedMessage } from './token-event-created.message';

export class TokensMintedEventMessage extends TokenEventCreatedMessage {
  static override routingKey = 'tokenize.token.tokens_minted';

  override readonly to!: string;
}
