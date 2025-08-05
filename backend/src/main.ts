import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // 🔥 FRONTEND'İN BACKEND’E ERİŞEBİLMESİ İÇİN CORS AÇILDI
  app.enableCors({
    origin: 'http://localhost:3000', // ← Next.js frontend adresin
    credentials: true
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
