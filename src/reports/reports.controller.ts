import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('/')
  getData() {
    return 'test data';
  }
  @Post('/addReport')
  async addReport(@Body() body: CreateReportDto) {
    try {
      const result = await this.reportsService.createReport(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
