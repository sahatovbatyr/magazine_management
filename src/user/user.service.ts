import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AbsBaseModelService } from '../common/AbsBaseModelService';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { RoleService } from '../role/role.service';
import { RolesEnum } from '../enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { UserUpdateRolesDto } from './dto/user.update-roles.dto';
import { UserUpdateEmailDto } from './dto/user.update-email.dto';
import { UserUpdatePasswordDto } from './dto/user.update-password.dto';

@Injectable()
export class UserService extends AbsBaseModelService<User> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {
    super(userRepository, User.name);
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

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    userDto.password = hash;

    userDto.roles = [await this.roleService.findOneByProp_orThrow('title', RolesEnum.USER)];
    return await super.create(userDto);
  }

  public async getByUsername(username: string): Promise<User | null> {
    return await super.findOneByProp('username', username);

  }

  public async getByUsername_orThrow(username: string): Promise<User> {
    return await super.findOneByProp_orThrow('username', username);

  }

  public async getByEmail(email: string): Promise<User | null> {
    return await super.findOneByProp('email', email);

  }

  public async getByEmail_orThrow(email: string): Promise<User> {
    return await super.findOneByProp_orThrow('email', email);

  }

  async updateRoles(userDto: Readonly<UserUpdateRolesDto>): Promise<User> {
    if (userDto.roleIdList.length == 0) {
      throw new BadRequestException('Specify the users roles!');
    }

    const user = await super.findById_orThrow(userDto.id);
    const roles = await this.roleService.getRolesByIdList(userDto.roleIdList);

    if (roles.length != userDto.roleIdList.length) {
      throw new BadRequestException('Incorrect roles.');
    }

    user.roles = roles;
    const res = await this.userRepository.save(user);
    // this.logger.log(` User id:${userDto.id} roles updated`);

    return res;
  }

  async updateEmail(
    userDto: Readonly<UserUpdateEmailDto>,
    author: string,
  ): Promise<User> {
    if (author !== userDto.username) {
      throw new ForbiddenException('Access Denied. The email can be changed only by the owner.');
    }

    const user = await this.getByUsername_orThrow(userDto.username);
    const userByEmail = await this.getByEmail(userDto.email);

    if (userByEmail) {
      throw new BadRequestException(`Email ${userDto.email} already exists.`);
    }
    user.email = userDto.email;
    const res = await this.userRepository.save(user);
    return res;
  }


  async comparePassword(unhashedPassword: string, hashedPassword: string) {
    return await bcrypt.compare(unhashedPassword, hashedPassword);
  }

  async updatePassword(userDto: UserUpdatePasswordDto, author: string) {
    if (author !== userDto.username) {
      throw new ForbiddenException(
        'Access Denied. The password can be changed only by the owner.',
      );
    }
    // this.logger.log(`trying updatePassword() for user: ${userDto.username}`);

    if (userDto.newPassword != userDto.newPasswordConfirmation) {
      throw new BadRequestException('new Password and confirmation not match.');
    }

    const hashedOldPassword = await bcrypt.hash(userDto.oldPassword, 10);

    const user = await this.userRepository.findOne({
      where: { username: userDto.username },
    });

    if (!user) {
      throw new NotFoundException('Username or password are wrong not match.');
    }

    const isPasswordValid = await bcrypt.compare(
      hashedOldPassword,
      user.password,
    );

    if (isPasswordValid) {
      throw new NotFoundException('Username or password are wrong not match.');
    }

    user.password = await bcrypt.hash(userDto.newPassword, 10);
    await this.userRepository.save(user);
    // this.logger.log(`User: ${user.username} password changed.`);
    return;
  }


}