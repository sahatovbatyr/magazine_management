import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfigService } from '../config/emailConfigModule/EmailConfigService';
import { ConfigModule } from '@nestjs/config';
import { EmailConfigModule } from '../config/emailConfigModule/EmailConfigModule';

@Module({
  imports: [
    EmailConfigModule,
    MailerModule.forRootAsync({
      imports: [
        ConfigModule,
        EmailConfigModule,
      ],
      inject: [EmailConfigService],
      useFactory: (emailConfig: EmailConfigService) => ({
        transport: {
          host: emailConfig.smtpHost,
          port: emailConfig.smtpPort,
          secure: true,
          auth: {
            user: emailConfig.username,
            pass: emailConfig.password,
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [
    EmailService,
  ],
})
export class EmailModule {

}
