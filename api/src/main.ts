import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as config from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(morgan('tiny'));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://web.docker:3000', 'http://localhost:8081'],
  });

  await app.listen(config.http.port, '0.0.0.0');
  console.log(`Listening on :${config.http.port}`);
}
bootstrap();
