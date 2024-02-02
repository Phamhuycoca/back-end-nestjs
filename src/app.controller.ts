import { Controller, Get } from '@nestjs/common';
import { HttpStatus } from './constant/constant';
import { ErrorResponse } from './helpers/response';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return 'Đang sống tốt'
  }
}
