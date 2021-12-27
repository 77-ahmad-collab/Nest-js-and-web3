import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './web3/web3.module';
import { CpuModule } from './cpu/cpu.module';

@Module({
  imports: [Web3Module, CpuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
