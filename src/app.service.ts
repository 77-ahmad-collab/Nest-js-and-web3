import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProducts() {
    return 'thsi route has been created';
  }
}
