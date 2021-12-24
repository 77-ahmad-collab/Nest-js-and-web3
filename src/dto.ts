import { IsString, MinLength } from 'class-validator';

export class DTO {
  @IsString()
  name: string;
  @MinLength(2)
  id: string;
}
