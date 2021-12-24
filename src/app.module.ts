import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './web3/web3.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [Web3Module],
})
export class AppModule {}
