import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...rest } = user;
        const token = this.jwtService.sign(rest, {
          algorithm: 'HS256',
          expiresIn: '1h',
        });

        return { user, token };
      }
      throw new BadRequestException('Invalid password');
    }
    throw new BadRequestException('email not found');
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    const { email, name, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: {
        id: crypto.randomUUID(),
        email,
        name,
        password: hashedPassword,
      },
    });

    return user;
  }
}
