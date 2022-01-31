import { Module } from '@nestjs/common';
import { TaskService } from './tasksServices/tasks.Service';
import { Web3Controller } from './web3.controller';
import { Web3Service } from './web3.service';

@Module({
  controllers: [Web3Controller],
  providers: [Web3Service, TaskService],
})
export class Web3Module {}
