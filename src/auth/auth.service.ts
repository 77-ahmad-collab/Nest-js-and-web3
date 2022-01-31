import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ userId: number; username: string }> {
    console.log(username, password, '===in the validate user function');
    const user = await this.usersService.findUser(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    } else throw new UnauthorizedException('InvalidCredentials');
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
