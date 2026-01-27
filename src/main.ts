import 'crypto';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  const config = new DocumentBuilder()
  .setTitle("Nestjs Masterclass - Blog app API")
  .setDescription("Use the base API URL as http://localhost:3000")
  .setTermsOfService("http://localhost:3000/term-of-service")
  .setLicense(
    "MIT License",
    "https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt"
  ).addServer("http://localhost:3000")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document)
 
app.enableCors({
  origin: "http://localhost:3500",
  credentials: true
});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
