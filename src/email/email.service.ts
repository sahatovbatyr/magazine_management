import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from './dto/email.dto';


@Injectable()
export class EmailService {

  constructor(
    private readonly mailService: MailerService,
  ) {
  }

  async sendMail(emailDto: EmailDto) {
    // const htmlTemplate = await this.getTemplate('default');

    // TypeScript hack to access private property (use cautiously)
    const transporter = (this.mailService as any).transporter;

    if (transporter) {
      console.log('SMTP Host:', transporter.options.host);
      console.log('SMTP Auth User:', transporter.options.auth?.user);

      // Test connection
      await transporter.verify();
      console.log('SMTP Connection verified!');
    }

    this.mailService.sendMail({
      // from: emailDto.sender,
      to: emailDto.receiver,
      subject: emailDto.subject,
      text: emailDto.message,
      // template: htmlTemplate,
      // context: { // Data to be passed to template
      //   name: name,
      //   joinDate: new Date().toLocaleDateString(),
      //   promoCode: 'WELCOME20',
      //   currentYear: new Date().getFullYear(),
      // },

    });


  }


  async getTemplate(template: string) {
    const templateDir = join(__dirname, 'templates');
    const path = `${templateDir}/${template}.html`;

    const html = fs.promises.readFile(path, 'utf8');

    return html;
  }


}
