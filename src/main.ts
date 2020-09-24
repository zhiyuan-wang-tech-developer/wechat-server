import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, HOST } from './utils/config';
import { RedisIoAdapter } from './adapters/redis.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(PORT, HOST);
  app
    .getUrl()
    .then((url: string) => console.info(`Application is running on: ${url}`));
}

bootstrap();
