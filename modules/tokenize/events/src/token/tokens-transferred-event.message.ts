import { TokenEventCreatedMessage } from './token-event-created.message';

export class TokensTransferredEventMessage extends TokenEventCreatedMessage {
  static override routingKey = 'tokenize.token.tokens_transferred';

  override readonly from!: string;
  override readonly to!: string;
}
