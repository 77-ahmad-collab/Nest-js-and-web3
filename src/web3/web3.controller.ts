import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './tasksServices/tasks.Service';
import { ResponseObject } from './type';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
  constructor(
    private readonly Web3Service: Web3Service,
    private readonly TaskService: TaskService,
  ) {}
  @Get('/task1')
  async sendTransaction(): Promise<ResponseObject> {
    return await this.Web3Service.sendTransaction(22);
  }
  @Get('/task2')
  async ContractInteraction() {
    const data = await this.TaskService.contractInteraction();
    return data;
  }
  @Post('/task3')
  async filterTokenTransfer(
    @Body() body: { address: string; eventName: string },
  ) {
    try {
      const { address, eventName } = body;
      const result = await this.TaskService.filterTransfersByAddress(
        address,
        eventName,
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post('/task4')
  async subscribeToEvent(@Body() body: { token: string }) {
    try {
      const { token } = body;
      const result = await this.TaskService.subscribeToEvent(token);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/task5')
  async transactionStatus(@Body() body: { transactionHash: string }) {
    try {
      const { transactionHash } = body;
      const result = await this.TaskService.transactionStatus(transactionHash);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/task6')
  async tokenTransferred(@Body() body: { transactionHash: string }) {
    try {
      const { transactionHash } = body;
      const result = await this.TaskService.tokenTransferred(transactionHash);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/task7')
  async sendTranactionWithGasPrice(@Body() body: { type: string }) {
    try {
      const { type } = body;
      console.log(type, 'type');
      const result = await this.TaskService.sendTransactionWithGasPrice(type);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/task8')
  async getAllTransactions(@Body() body: { address: string }) {
    try {
      const { address } = body;
      const result = await this.TaskService.getAllTransactions(address);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/task9')
  async getParticularTokenTransfer(
    @Body() body: { address: string; eventName: string },
  ) {
    try {
      const { address, eventName } = body;
      const result = await this.TaskService.filterTransfersByAddress(
        address,
        eventName,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/task10')
  async getDeployerAddress(@Body() body: { contractAddress: string }) {
    try {
      const { contractAddress } = body;
      const result = await this.TaskService.getDeployerAddress(contractAddress);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/task11')
  async getTokenHolders() {
    try {
      const getHolders = await this.TaskService.getTokenHolders();
      return getHolders;
    } catch (error) {
      console.log(error);
    }
  }
}
