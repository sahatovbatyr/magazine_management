import { BadRequestException, Injectable } from '@nestjs/common';
import { AbsBaseModelService } from '../common/AbsBaseModelService';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { RoleService } from '../role/role.service';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class UserService extends AbsBaseModelService<User> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {
    super(userRepository);
  }

  protected getRelations(): string[] {
    return ['roles'];
  }

  public async create(userDto: UserCreateDto): Promise<User> {

    if (userDto.password != userDto.password_confirmation) {
      throw new BadRequestException(`Error. Passwords NOT match!`);
    }

    let dbUser: User | null = await super.findOneByProp('username', userDto.username);
    if (dbUser) {
      throw new BadRequestException(`Error. username: ${userDto.username} already exists.`);
    }

    if (userDto.email && (await super.findOneByProp('email', userDto.email))) {
      throw new BadRequestException(`Error. user with email: ${userDto.email} already exists.`);
    }

    userDto.roles = [await this.roleService.findOneByProp_orThrow('title', RolesEnum.USER)];
    return super.create(userDto);
  }


}