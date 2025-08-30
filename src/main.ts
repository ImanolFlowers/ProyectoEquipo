import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pruebas del proyecto')
    .setDescription('Backend de proyecto de ejemplo')
    .setVersion('1,0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en los dtos
      forbidNonWhitelisted: false, // lanza error si mandan propiedades no permitidas
      transform: true, // transforma tipos (por ejemplo string a number)
    }),
  );

  await app.listen(3000);
}
bootstrap();
