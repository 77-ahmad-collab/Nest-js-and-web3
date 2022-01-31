import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './tasksServices/tasks.Service';
import { ResponseObject } from './type';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
  constructor(
    private readonly Web3Service: Web3Service,
    private readonly Task2Service: TaskService,
  ) {}
  @Get('/task1')
  async sendTransaction(): Promise<ResponseObject> {
    return this.Web3Service.sendTransaction();
  }
  @Get('/task2')
  async ContractInteraction() {
    const data = await this.Task2Service.contractInteraction();
    return data;
  }
  @Post('/task/ether')
  async filterTokenTransfer(@Body() body: { address: string }) {
    try {
      const { address } = body;
      const result = await this.Task2Service.filterTransfersByAddress(address);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
