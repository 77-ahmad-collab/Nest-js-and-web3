import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';
const scrypt = promisify(_scrypt);

@Injectable()
export class Authorization {
  constructor(
    public readonly userService: UserService, // @InjectModel('test') private UserModel: Model<User>, // private UserService: UserService,
  ) {}
  async testRoute() {
    return 'this is a test route';
  }
  testData() {
    console.log('sddsd', this.userService);

    // console.log(this.userService.test());
  }
  // async signUp(email: string, password: string) {
  //   const user = await this.UserModel.findOne({ email });
  //   if (user) throw new BadRequestException('User ALready exits');
  //   const salt = randomBytes(8).toString('hex');
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;
  //   const result = hash.toString('hex') + '.' + salt;
  //   const saveUser = await this.UserModel.create({
  //     email: email,
  //     password: result,
  //   });
  //   return saveUser;
  // }
  // async signIn(email: string, password: string) {
  //   const user = await this.UserModel.findOne({ email });
  //   console.log(user);
  //   if (!user) throw new NotFoundException("Email or User name doesn't exists");
  //   console.log(user.password);
  //   const [storedHash, salt] = user.password.split('.');
  //   console.log('stored hash: ' + storedHash, 'Salt', salt);
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;
  //   if (storedHash == hash.toString('hex')) {
  //     return user;
  //   } else {
  //     throw new BadRequestException('Invalid Credentials');
  //   }
  // }
}
