import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EnvKeysEnum } from '../../enums/EnvKeysEnum';

@Injectable()
export class EmailConfigService {
  constructor(private configService: ConfigService) {
  }

  get smtpHost(): string {
    return this.configService.getOrThrow<string>(EnvKeysEnum.EMAIL_SMTP_HOST);
  }

  get smtpPort(): number {
    return this.configService.getOrThrow<number>(EnvKeysEnum.EMAIL_SMTP_PORT);
  }


  get username(): string {
    return this.configService.getOrThrow<string>(EnvKeysEnum.EMAIL_USER);
  }

  get password(): string {
    return this.configService.getOrThrow<string>(EnvKeysEnum.EMAIL_PASSWORD);
  }
}
