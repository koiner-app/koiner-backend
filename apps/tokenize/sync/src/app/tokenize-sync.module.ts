import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule } from '@koinos/jsonrpc';
import { AmqpModule } from './amqp.module';
import { KoinerLoggerModule } from '@koiner/logger/nestjs';
import { LoggerModule } from './logger.module';
import { TokenizeModule } from './tokenize.module';
import { TokenizeAmqpHandlers } from './amqp';

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    KoinosModule,
    KoinerLoggerModule,
    LoggerModule,
    TokenizeModule,
  ],
  providers: [...TokenizeAmqpHandlers],
})
export class TokenizeSyncModule {}
