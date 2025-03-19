import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleService } from './role/role.service';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private readonly roleService: RoleService) {
  }

  async onModuleInit() {
    await this.roleService.seed();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
