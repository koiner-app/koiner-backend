import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { TokenizeModule } from './tokenize.module';
import { TokenizeSyncModule } from './tokenize-sync.module';

import * as config from '../config';

@Module({
  imports: [
    AmqpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    GlobalAppModule,
    TokenizeModule,
    TokenizeSyncModule,
  ],
})
export class AppModule {}
