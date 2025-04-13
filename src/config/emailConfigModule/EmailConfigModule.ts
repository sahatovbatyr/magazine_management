import { EmailConfigService } from './EmailConfigService';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailConfigService],
  exports: [EmailConfigService],
})
export class EmailConfigModule {
}