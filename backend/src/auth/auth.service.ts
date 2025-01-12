import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const userFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z
    .string()
    .min(3, 'Min character is 3')
    .max(255, 'Max character reached'),
  password: z.string().min(8, 'Password must be at least 8 character'),
});

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

        return { rest, token };
      }
      throw new BadRequestException('Invalid password');
    }
    throw new BadRequestException('Invalid email');
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    const { email, name, password } = userFormSchema.parse(createUserDto);

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
