import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const isTokenExist = req.headers.authorization?.split(' ')[1];

    if (!isTokenExist) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Access denied, Token required',
      });
    }

    try {
      const decoded = await this.jwtService.verify(isTokenExist, {
        algorithms: ['HS256'],
        secret: process.env.JWT_SECRET,
      });
      req.body.userDiagnose = decoded;
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Invalid token',
      });
    }
    next();
  }
}
