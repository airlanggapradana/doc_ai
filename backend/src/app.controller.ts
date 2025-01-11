import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: this.appService.getHello(),
    });
  }
}
