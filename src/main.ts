import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();
const cookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    cookieSession({
      keys: ['ahshshsh'],
    }),
  );
  const PORT = process.env.PORT || 5000;
  app.useGlobalPipes(new ValidationPipe());
  console.log(`App is Listenable on port ${PORT}`);
  await app.listen(7000);
}
bootstrap();
