import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppEnvInterface } from './config/AppEnvInterface';
import { EnvKeysEnum } from './enums/EnvKeysEnum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppEnvInterface>>(ConfigService);

  const port: number = configService.get<number>(EnvKeysEnum.HOST_PORT) ?? 3000;
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`Server started on port:${port}`);

}

bootstrap();
