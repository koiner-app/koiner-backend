import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { LogLevel } from '@nestjs/common/services/logger.service';

async function bootstrap() {
  const logLevel: LogLevel[] = process.env.LOG_LEVEL
    ? (JSON.parse(process.env.LOG_LEVEL) as LogLevel[])
    : ['log', 'error', 'warn'];

  console.log('logLevel', logLevel);
  const app = await NestFactory.create(AppModule, {
    logger: logLevel,
  });
  const port = process.env.PORT || 3101;
  await app.listen(port);
  Logger.log(`🚀 Chain Sync is running on: http://localhost:${port}`);
}

bootstrap();
