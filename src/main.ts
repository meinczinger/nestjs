import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // If nestjs encounters any validation decorators, it will know to execute validaiton pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
