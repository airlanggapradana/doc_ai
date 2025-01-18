import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    const users = await this.databaseService.user.findMany();

    const result = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return result;
  }

  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: {
        diagnosa: true,
      },
    });

    return user;
  }

  async update(userId: string, updateUserDto: Prisma.UserUpdateInput) {
    const updatedUser = await this.databaseService.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(userId: string) {
    const deletedUser = await this.databaseService.user.delete({
      where: { id: userId },
    });

    return deletedUser;
  }
}
