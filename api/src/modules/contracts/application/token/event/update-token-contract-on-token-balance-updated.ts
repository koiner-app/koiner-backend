import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokenBalanceUpdated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateTokenContractCommand } from '../command';
import { UpdateTokenContractStatisticsProps } from '@koiner/contracts/domain/token/token-contract-statistics';

export class UpdateTokenContractOnTokenBalanceUpdated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokenBalanceUpdated);
  }

  async handle(event: TokenBalanceUpdated): Promise<void> {
    let mintedTokens: number | undefined;
    const stats: UpdateTokenContractStatisticsProps = {};

    // Do all stats updates to TokenContract in one go to prevent read/write conflicts
    if (event.balance === 0) {
      // Address is not holding any tokens anymore
      stats.holderCount = -1;
    }

    // Only count operations for receiver to prevent double counting
    if (
      event.tokensOrigin !== TokensOrigin.blockReward &&
      event.amountChanged > 0
    ) {
      stats.operationCount = 1;
    }

    if (event.tokensOrigin === TokensOrigin.mint) {
      mintedTokens = event.amountChanged;
      stats.mintCount = 1;
    }

    // Only count operations for receiver to prevent double counting
    if (
      event.tokensOrigin === TokensOrigin.transfer &&
      event.amountChanged > 0
    ) {
      stats.transferCount = 1;
    }

    if (event.tokensOrigin === TokensOrigin.blockReward) {
      mintedTokens = event.amountChanged;
    }

    if (mintedTokens || Object.entries(stats).length) {
      await this.commandBus.execute(
        new UpdateTokenContractCommand(event.contractId, mintedTokens, stats),
      );
    }
  }
}
