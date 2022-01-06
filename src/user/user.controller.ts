import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { Authorization } from './auth.service';
import { CreateUser } from './dtos/create-user-dto';
import { HeaderDto } from './dtos/header.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    @InjectModel('test') private UserModel: Model<User>,
    private authService: Authorization,
  ) {}

  @Get('/')
  async getUser() {
    const data = await this.UserModel.find();
    console.log(data);
    return data;
  }
  @Post('/register')
  async registerUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const result = await this.authService.signUp(email, password);
    return result;
  }
  @Get('/login/:email/:password')
  async Login(
    @Param('email') email: string,
    @Param('password') password: string,
    @Session() session: any,
    // @Headers('authorization') authorization: HeaderDto,
  ) {
    // console.log(authorization, 'auth>>>>>>>>>>>>>>>>');
    // if (!authorization) throw new BadRequestException('Missing api key');

    const result = await this.authService.signIn(email, password);
    // session.userId = 20;
    console.log(session);
    return result;
  }
  @Post('/signup')
  @Serialize(new SerializeInterceptor(UserDto))
  async createUser(@Body() body: UserDto): Promise<UserDto> {
    console.log(body);
    console.log('user is created');
    const result = await this.userService.create(body.email, body.password);
    console.log(result);
    return {
      id: result.id,
      email: result.email,
      password: result.password,
    };
  }
}
