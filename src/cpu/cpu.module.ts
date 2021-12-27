import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';
import { PowerService } from 'src/power/power.service';
import { CpuService } from './cpu.service';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
