import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    if (!email || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Email and password are required',
      });
    }

    const login = await this.authService.login(email, password);
    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      result: login,
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: Prisma.UserCreateInput,
    @Res() res: Response,
  ) {
    try {
      const { email, name, password } = createUserDto;

      if (!email || !name || !password) {
        return res.status(HttpStatus.NOT_ACCEPTABLE).json({
          message: 'Please provide all required fields',
        });
      }

      const user = await this.authService.register(createUserDto);

      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        result: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error creating user',
      });
    }
  }
}
