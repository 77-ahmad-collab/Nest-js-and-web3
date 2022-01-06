import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './web3/web3.module';
import { CpuModule } from './cpu/cpu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './user/user.entity';
import { Report } from './reports/reports.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqLite',
      entities: [User, Report],
      synchronize: true,
    }),
    Web3Module,
    CpuModule,
    UserModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
