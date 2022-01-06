import { Expose, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
export class UserDto {
  @Expose()
  id: number;
  @Exclude()
  @IsEmail()
  email: string;
  @Exclude()
  password: string;
}
