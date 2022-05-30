import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import {
  TokenBalanceCreated,
  TokensOrigin,
  UpdateTokenContractStatisticsProps,
} from '@koiner/contracts/domain';
import { UpdateTokenContractCommand } from '../command';

export class UpdateTokenContractOnTokenBalanceCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokenBalanceCreated);
  }

  async handle(event: TokenBalanceCreated): Promise<void> {
    let mintedTokens: number | undefined;
    const stats: UpdateTokenContractStatisticsProps = {};

    // Do all stats updates to TokenContract in one go to prevent read/write conflicts
    stats.holderCount = 1;

    if (event.tokensOrigin !== TokensOrigin.blockReward) {
      stats.operationCount = 1;
    }

    if (event.tokensOrigin === TokensOrigin.mint) {
      mintedTokens = event.balance;
      stats.mintCount = 1;
    }

    if (event.tokensOrigin === TokensOrigin.transfer) {
      stats.transferCount = 1;
    }

    if (event.tokensOrigin === TokensOrigin.blockReward) {
      mintedTokens = event.balance;
    }

    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        mintedTokens,
        stats,
      }),
    );
  }
}
