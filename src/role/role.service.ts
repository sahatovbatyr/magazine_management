import { Injectable } from '@nestjs/common';
import { AbsBaseModelService } from '../common/AbsBaseModelService';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RoleService extends AbsBaseModelService<Role> {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  protected getRelations(): string[] {
    return [];
  }


  async seed() {
    for (const role of Object.values(RolesEnum)) {
      let candidate = await super.findOneByProp('title', role);
      if (!candidate) {
        candidate = new Role(role);
        super.create(candidate);
      }
    }
  }


}
