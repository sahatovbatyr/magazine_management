import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvKeysEnum } from '../enums/EnvKeysEnum';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

export const DatabaseConfig = TypeOrmModule.forRootAsync({

  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get(EnvKeysEnum.DB_HOST || 'localhost'),
    port: Number(configService.get(EnvKeysEnum.DB_PORT)),
    username: configService.get(EnvKeysEnum.DB_USER) || 'postgres',
    password: configService.get(EnvKeysEnum.DB_PASSWORD) || 'postgres',
    database: String(configService.get(EnvKeysEnum.DB_NAME)) || 'postgres',
    entities: [User, Role],
    synchronize: true,
    charset: 'utf8',
  }),

});