import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, Context: ExecutionContext) => {
    const request = Context.switchToHttp().getRequest();
    console.log(request.session.userId, 'The id that we got in the decorator');
    return 'HI there i have acessed';
  },
);
