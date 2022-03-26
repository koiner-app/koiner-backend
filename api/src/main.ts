import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as config from '@config';
import * as pg from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(morgan('tiny'));

  app.useGlobalPipes(new ValidationPipe());

  // BigInt is returned as string. Use this workaround for parsing them as ints
  // See: https://github.com/typeorm/typeorm/issues/2400
  pg.types.setTypeParser(20, function (val) {
    return parseInt(val);
  });

  await app.listen(config.http.port, '0.0.0.0');
  console.log(`Listening on :${config.http.port}`);
}
bootstrap();
