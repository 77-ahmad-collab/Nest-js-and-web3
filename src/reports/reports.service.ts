import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report-dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}
  async createReport(body: CreateReportDto) {
    try {
      const result = await this.reportRepository.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
