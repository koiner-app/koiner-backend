import { TokenEventCreatedMessage } from './token-event-created.message';

export class TokensMintedEventMessage extends TokenEventCreatedMessage {
  static override eventName = 'tokenize.token.tokens_minted';

  override readonly to!: string;
}
