import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const winstonFileFormat = {
  format: format.combine(
    format.label({ label: 'Koiner' }),
    format.ms(),
    format.json(),
    format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label'],
    }),
    format.printf(
      (info) =>
        `[${info.label}] [${info.level}] ${info.timestamp} [${info.metadata.context}]: ${info.message} ${info.ms}`,
    ),
  ),
};

export const winstonLogger = WinstonModule.createLogger({
  format: format.combine(
    format.ms(),
    format.timestamp({ format: 'YYYY-MM-DD H:mm:ss' }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        // format.timestamp({ format: 'DD-MM-YYYY H:mm:ss' }),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Koiner', {
          prettyPrint: true,
        }),
      ),
    }),
    new transports.DailyRotateFile({
      filename: '/var/logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      ...winstonFileFormat,
    }),
    new transports.DailyRotateFile({
      filename: '/var/logs/debug-%DATE%-object.log',
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: format.combine(format.json()),
    }),
    new transports.File({
      filename: '/var/logs/error.log',
      level: 'error',
      ...winstonFileFormat,
    }),
    new transports.File({
      filename: '/var/logs/error-object.log',
      level: 'error',
      format: format.combine(format.json()),
    }),
  ],
});
