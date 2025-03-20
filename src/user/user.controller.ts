import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('create')
  async create(@Body() userDto: UserCreateDto) {
    const user = this.userService.create(userDto);
    const userRes = plainToInstance(UserResponseDto, user);
    return userRes;
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userService.findById_orThrow(id);
    return plainToInstance(UserResponseDto, user);

  }


}
