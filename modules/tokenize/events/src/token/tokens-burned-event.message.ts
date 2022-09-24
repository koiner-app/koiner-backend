import { TokenEventCreatedMessage } from './token-event-created.message';

export class TokensBurnedEventMessage extends TokenEventCreatedMessage {
  static override routingKey = 'tokenize.token.tokens_burned';

  override readonly from!: string;
}
