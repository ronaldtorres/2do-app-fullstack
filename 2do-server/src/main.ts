import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    origin: ['http://127.0.0.1:3001', 'http://localhost:3001'],
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
