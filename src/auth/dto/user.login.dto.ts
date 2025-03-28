import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UserLoginDto {

  @ValidateIf(object => !object.email)
  @IsString()
  @IsOptional()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @ValidateIf(object => !object.username)
  @IsEmail()
  @IsOptional()
  email!: string;

}