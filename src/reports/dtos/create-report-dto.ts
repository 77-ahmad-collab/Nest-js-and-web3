import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateReportDto {
  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @Transform(({ value }) => parseInt(value))
  @Min(1970)
  @Max(2029)
  @IsNumber()
  year: number;
  @IsNumber()
  lng: number;
  @IsNumber()
  lat: number;
  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;
}
