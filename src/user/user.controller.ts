import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';
import { ReqParamParseIntPipe } from '../pipes/ReqParamParseIntPipe';
import { User } from './user.entity';
import { UserUpdateRolesDto } from './dto/user.update-roles.dto';
import { MessageDto } from '../common/message.dto';
import { UserUpdatePasswordDto } from './dto/user.update-password.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Post('create')
  async create(@Body() userDto: UserCreateDto): Promise<UserResponseDto> {
    const user = this.userService.create(userDto);
    const userRes = plainToInstance(UserResponseDto, user);
    return userRes;
  }

  @Get('get-by-id/:id')
  async getById(@Param('id', ReqParamParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.userService.findById_orThrow(id);
    return plainToInstance(UserResponseDto, user);

  }

  @Get('/get-all')
  async findAll(): Promise<UserResponseDto[]> {
    const users: User[] = await this.userService.findAll();
    return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });

  }

  @Post('/update-roles')
  async updateRoles(@Body() userDto: UserUpdateRolesDto): Promise<MessageDto> {
    await this.userService.updateRoles(userDto);
    // this.logger.log('userTemp ', userTemp);
    return new MessageDto('Role succesfully updated');
  }

  @Post('/update-password')
  async updatePassword(@Body() userDto: UserUpdatePasswordDto, @Req() req: any): Promise<MessageDto> {
    const payload = this.authService.getPayload(req);
    await this.userService.updatePassword(payload.userId, userDto);
    return new MessageDto('Password succesfully updated!');
  }

  // @Post('/update-email')
  // async updateEmail(@Body() userDto: UpdateUsersEmailDto, @Req() req: any, @Res() res: Response) {
  //   const reqUser: UserRequestDto = req.user as UserRequestDto;
  //   await this.userService.updateEmail(userDto, reqUser.username);
  //   return res.status(200).json({ message: 'Email succesfully updated' });
  // }


}
