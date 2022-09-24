import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { AmqpModule } from './amqp.module';
import { TokenizeModule } from './tokenize.module';
import { TokenizeAmqpHandlers } from './amqp';

@Module({
  imports: [AmqpModule, CqrsModule, KoinosModule, TokenizeModule],
  providers: [Logger, RawBlocksService, ...TokenizeAmqpHandlers],
})
export class TokenizeSyncModule {}
