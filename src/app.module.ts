import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { appEnvVar } from './config/app.env.config';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    DatabaseConfig,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvVar],
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
