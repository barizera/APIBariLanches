import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Bari Lanches')
    .setDescription('API responsavel pela gestão da Bari Lanches')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('users')
    .addTag('category')
    .addTag('products')
    .addTag('tables')
    .addTag('orders')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
