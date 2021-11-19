import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   next();
  // });
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
