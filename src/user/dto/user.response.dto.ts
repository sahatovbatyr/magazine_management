import { Exclude } from 'class-transformer';

export class UserResponseDto {

  id!: number;
  username!: string;
  @Exclude()
  password!: string;


}