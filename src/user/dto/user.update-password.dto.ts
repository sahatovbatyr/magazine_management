import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdatePasswordDto {
  // @ApiProperty({ example: 'username', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  // @ApiProperty({ example: 'old123', description: 'Old password' })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword!: string;

  // @ApiProperty({ example: 'new123', description: 'New password' })
  @IsNotEmpty()
  @IsString()
  readonly newPassword!: string;

  // @ApiProperty({ example: 'new123', description: 'New password confirmation' })
  @IsNotEmpty()
  @IsString()
  readonly newPasswordConfirmation!: string;
}