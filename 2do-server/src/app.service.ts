import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHello(): string {
    return 'Welcome to the 2do api.';
  }
}
