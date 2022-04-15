import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { Krc20BalanceUpdated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateKrc20ContractCommand } from '../command';
import { UpdateKrc20ContractStatisticsProps } from '@koiner/contracts/domain/krc20/krc20-contract-statistics';

export class UpdateKrc20ContractOnKrc20BalanceUpdated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(Krc20BalanceUpdated);
  }

  async handle(event: Krc20BalanceUpdated): Promise<void> {
    let mintedTokens: number | undefined;
    const stats: UpdateKrc20ContractStatisticsProps = {};

    // Do all stats updates to Krc20Contract in one go to prevent read/write conflicts
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
        new UpdateKrc20ContractCommand(event.contractId, mintedTokens, stats),
      );
    }
  }
}
