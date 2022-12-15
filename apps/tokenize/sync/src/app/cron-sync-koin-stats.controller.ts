import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { CreateOrUpdateKoinStatsCommand } from '@koiner/tokenize/application';
import { catchError, firstValueFrom } from 'rxjs';

@Controller()
export class CronSyncKoinStatsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly commandBus: CommandBus
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'cronSyncKoinStats' })
  async cron(): Promise<void> {
    const apiUrl = this.configService.get('MEXC_API_URL');
    const apiKey = this.configService.get('MEXC_API_KEY');

    const { data: exchangeStats } = await firstValueFrom(
      this.httpService
        .get(`${apiUrl}/api/v3/avgPrice?symbol=KOINUSDT`, {
          headers: {
            'X-MEXC-APIKEY': apiKey,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw 'Could not call MEXC API';
          })
        )
    );

    const { data: orderBookStats } = await firstValueFrom(
      this.httpService
        .get(`${apiUrl}/api/v3/ticker/bookTicker?symbol=KOINUSDT`, {
          headers: {
            'X-MEXC-APIKEY': apiKey,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw 'Could not call MEXC API';
          })
        )
    );

    if (
      exchangeStats &&
      exchangeStats.price &&
      orderBookStats &&
      orderBookStats.bidPrice
    ) {
      const stats = {
        price: exchangeStats.price,
        bidPrice: orderBookStats.bidPrice,
        bidQuantity: orderBookStats.bidQty,
        askPrice: orderBookStats.askPrice,
        askQuantity: orderBookStats.askQty,
      };

      await this.commandBus.execute(
        new CreateOrUpdateKoinStatsCommand({
          id: koinosConfig.chainId,
          stats,
        })
      );
    }
  }
}
