import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateEmailDto {
  // @ApiProperty({ example: 'my_username', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  // @ApiProperty({ example: 'my_email@example.com', description: 'User email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}