import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { CreateOrUpdateKoinStatsCommand } from '@koiner/tokenize/application';
import { catchError, firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

interface MexcAggTrade {
  p: string; // Price
  q: string; // Quantity
  T: number; // Timestamp
  m: boolean; // Was the buyer the maker?
  M: boolean; // Was the trade the best price match?
}

interface MexcBookTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

@Controller()
export class CronSyncKoinStatsController {
  private readonly symbol = 'KOINUSDT';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly commandBus: CommandBus
  ) {}

  private validateApiConfig(): {
    apiUrl: string;
    apiKey: string;
    apiSecret: string;
  } {
    const apiUrl = this.configService.get<string>('MEXC_API_URL');
    const apiKey = this.configService.get<string>('MEXC_API_KEY');
    const apiSecret = this.configService.get<string>('MEXC_API_SECRET');

    if (!apiUrl || !apiKey || !apiSecret) {
      throw new Error('MEXC API configuration missing');
    }

    return { apiUrl, apiKey, apiSecret };
  }

  private generateSignature(queryString: string): string {
    const { apiSecret } = this.validateApiConfig();
    return crypto
      .createHmac('sha256', apiSecret)
      .update(queryString)
      .digest('hex');
  }

  private createSignedRequest(
    endpoint: string,
    params: Record<string, string | number> = {}
  ) {
    const { apiUrl, apiKey } = this.validateApiConfig();

    const timestamp = Date.now();
    const queryParams = new URLSearchParams({
      ...params,
      timestamp: timestamp.toString(),
    });

    const signature = this.generateSignature(queryParams.toString());
    queryParams.append('signature', signature);

    return {
      url: `${apiUrl}${endpoint}`,
      headers: {
        'X-MEXC-APIKEY': apiKey,
        Accept: 'application/json',
      },
      params: queryParams,
    };
  }

  private async makeSignedRequest<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ) {
    const {
      url,
      headers,
      params: queryParams,
    } = this.createSignedRequest(endpoint, params);

    return firstValueFrom(
      this.httpService.get<T>(url, { headers, params: queryParams }).pipe(
        catchError((error) => {
          this.logger.error(`MEXC API error for ${endpoint}`, {
            status: error.response?.status,
            data: error.response?.data,
            params,
          });
          throw new Error(`Failed to fetch data from ${endpoint}`);
        })
      )
    );
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'cronSyncKoinStats' })
  async cron(): Promise<void> {
    try {
      const [aggTradesResponse, bookTickerResponse] = await Promise.all([
        this.fetchAggTrades(),
        this.fetchBookTicker(),
      ]);

      const aggTradesData = aggTradesResponse.data;
      const bookTickerData = bookTickerResponse.data;

      if (!aggTradesData.length || !bookTickerData) {
        this.logger.warn('No data received from MEXC API');
        return;
      }

      const latestTrade = aggTradesData[aggTradesData.length - 1];
      const stats = {
        price: parseFloat(latestTrade.p),
        bidPrice: parseFloat(bookTickerData.bidPrice),
        bidQuantity: parseFloat(bookTickerData.bidQty),
        askPrice: parseFloat(bookTickerData.askPrice),
        askQuantity: parseFloat(bookTickerData.askQty),
      };

      await this.commandBus.execute(
        new CreateOrUpdateKoinStatsCommand({
          id: koinosConfig.chainId,
          stats,
        })
      );
    } catch (error) {
      this.logger.error('Failed to sync KOIN stats', error);
    }
  }

  private async fetchAggTrades() {
    return this.makeSignedRequest<MexcAggTrade[]>('/api/v3/aggTrades', {
      symbol: this.symbol,
      limit: 10,
    });
  }

  private async fetchBookTicker() {
    return this.makeSignedRequest<MexcBookTicker>('/api/v3/ticker/bookTicker', {
      symbol: this.symbol,
    });
  }
}
