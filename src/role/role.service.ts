import { Injectable } from '@nestjs/common';
import { AbsBaseModelService } from '../common/AbsBaseModelService';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RoleService extends AbsBaseModelService<Role> {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository, Role.name);
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

  async getRolesByIdList(roleIdList: number[]) {
    return await this.roleRepository.find({ where: { id: In(roleIdList) } });
  }


}
