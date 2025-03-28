import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { UserCreateDto } from '../user/dto/user.create.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @Post('/login')
  async login(@Body() userDto: UserLoginDto) {

    return this.authService.login(userDto);

  }

  @Post('/registration')
  async registration(@Body() userDto: UserCreateDto) {

    return this.authService.registration(userDto);

  }


}