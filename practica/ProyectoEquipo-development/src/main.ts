import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en los DTOs
      forbidNonWhitelisted: true, // lanza error si mandan propiedades no permitidas
      transform: true, // transforma tipos (por ejemplo string a number)
    }),
  );

  await app.listen(3000);
}
bootstrap();
