import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { Authorization } from './auth.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: 'test', schema: UserSchema, collection: 'test' },
    ]),
    MongooseModule.forRoot(
      'mongodb+srv://fypportal:ahmed123@cluster0.yvupc.mongodb.net/FYPTESTV1?retryWrites=true&w=majority',
    ),
  ],

  controllers: [UserController],
  providers: [UserService, Authorization],
  exports: [UserService],
})
export class UserModule {}
