import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class UserInterceptor implements NestInterceptor {
  constructor() {}
  async intercept(Context: ExecutionContext, next: CallHandler) {
    console.log('UserInterceptor');
    const request = Context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await { name: 'ahnad' };
      request.user = user;
    }
    return next.handle();
  }
}
