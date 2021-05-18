import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get()
  index(): string {
    return 'my first request23';
  }
  @Get('info')
  info(): string {
    return `<div>1</div>`;
  }
}
