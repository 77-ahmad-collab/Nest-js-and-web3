import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private PowerService: PowerService) {}
  getPower(): string {
    const data: string = this.PowerService.supplyPower();
    return `Power of 5 watt has beeen suplied by power module 
       ${data}`;
  }
}
