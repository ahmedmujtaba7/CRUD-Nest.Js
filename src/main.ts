import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Allow CORS for frontend
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Enable global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

