import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(): string {
    return 'Power is being suplied to CPU';
  }
}
