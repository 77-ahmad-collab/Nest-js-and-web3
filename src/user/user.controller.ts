import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Session,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { Authorization } from './auth.service';
import { CurrentUser } from './customDecorators/current-user.decorators';
import { CreateUser } from './dtos/create-user-dto';
import { HeaderDto } from './dtos/header.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: Authorization) {} // private userService: UserService, // @InjectModel('test') private UserModel: Model<User>, // private authService: Authorization,

  @Get('/')
  getData() {
    return this.authService.testData();
  }
  // @Get('/user')
  // async getUser(@CurrentUser() user: string) {
  //   console.log(user);
  //   return user;
  // }
  // @Post('/register')
  // async create(@Body() body: { email: string; password: string }) {
  //   const { email, password } = body;
  //   const result = await this.userService.create(email, password);
  //   return result;
  // }
  // @Get('/login/:email/:password')
  // async Login(
  //   @Param('email') email: string,
  //   @Param('password') password: string,
  //   @Session() session: any,
  //   // @Headers('authorization') authorization: HeaderDto,
  // ) {
  //   const result = await this.authService.signIn(email, password);
  //   session.userId = result._id;
  //   console.log(session);
  //   return result;
  // }
  // @Get('/whoAmi')
  // async getCurrentUser(@Session() session: any) {
  //   if (!session.userId) throw new BadRequestException('Missing');
  //   const result = await this.UserModel.findOne({ _id: session.userId });
  //   if (!result) throw new UnauthorizedException('please sign in');
  //   console.log('session is being mainted');
  //   return result;
  // }
  // @Get('/signout')
  // async SignOut(@Session() session: any) {
  //   session.userId = null;
  //   return 'you have signed out';
  // }
  // @Post('/signup')
  // // @Serialize(new SerializeInterceptor(UserDto))
  // async createUser(@Body() body: UserDto) {
  //   console.log(body);
  //   console.log('user is created');
  //   const result = await this.userService.create(body.email, body.password);
  //   console.log(result);
  //   return {
  //     email: result.email,
  //     password: result.password,
  //   };
  // }
}
