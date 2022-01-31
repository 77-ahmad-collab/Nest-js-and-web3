import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  // constructor() {}
  // async ReteriveData() {
  //   return 'test data';
  // }
  async create(email: string, password: string) {
    return { email, password };
  }
  checkForData(): {
    result: string;
  } {
    return { result: 'you have sucess fully called that functio' };
  }

  test(): string {
    return 'sdkdjkjkds';
  }
  // async find(email: string) {
  //   try {
  //     await this.repo.findOne({ email });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
