import { Logger as NestLoggerBase } from '@nestjs/common';
import { Logger } from '@appvise/domain';

export class NestLogger extends NestLoggerBase implements Logger {
  setContext(context: string): void {
    this.context = context;
  }
}
