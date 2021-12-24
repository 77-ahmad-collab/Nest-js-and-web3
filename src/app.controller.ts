import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DTO } from './dto';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name/:id')
  rootRoute(@Param() params: DTO): string {
    const { name, id } = params;

    return `This is the requested route with the validation of params:
    Name is: ${name} and points are: ${id}`;
  }
}
