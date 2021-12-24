import { Controller, Get } from '@nestjs/common';
import { ResponseObject } from './type';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly Web3Service: Web3Service) {}
  @Get('/task1')
  async sendTransaction(): Promise<ResponseObject> {
    return this.Web3Service.sendTransaction();
  }
}
