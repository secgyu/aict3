import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { IMAGES_DIR } from './storage/storage.constants';

async function bootstrap() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true }),
  );

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();
