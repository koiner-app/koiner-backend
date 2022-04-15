import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { Krc20BalanceCreated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateKrc20ContractCommand } from '../command';
import { UpdateKrc20ContractStatisticsProps } from '@koiner/contracts/domain/krc20/krc20-contract-statistics';

export class UpdateKrc20ContractOnKrc20BalanceCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(Krc20BalanceCreated);
  }

  async handle(event: Krc20BalanceCreated): Promise<void> {
    let mintedTokens: number | undefined;
    const stats: UpdateKrc20ContractStatisticsProps = {};

    // Do all stats updates to Krc20Contract in one go to prevent read/write conflicts
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
      new UpdateKrc20ContractCommand(event.contractId, mintedTokens, stats),
    );
  }
}
