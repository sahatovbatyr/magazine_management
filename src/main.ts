import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppEnvInterface } from './config/AppEnvInterface';
import { EnvKeysEnum } from './enums/EnvKeysEnum';
import { CustomValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppEnvInterface>>(ConfigService);

  const port: number = configService.get<number>(EnvKeysEnum.HOST_PORT) ?? 3000;
  app.setGlobalPrefix('api');

  const validationPipe = new CustomValidationPipe();
  app.useGlobalPipes(validationPipe);


  await app.listen(port);
  console.log(`Server started on port:${port}`);


}

bootstrap();
