import { IsString, MinLength } from 'class-validator';

export class HeaderDto {
  @MinLength(2)
  @IsString()
  authorization: string;
}
