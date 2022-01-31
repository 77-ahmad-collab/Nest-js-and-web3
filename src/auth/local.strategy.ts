import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    try {
      const user = await this.authService.validateUser(username, password);
      console.log(user, 'the user that has been validated');
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
