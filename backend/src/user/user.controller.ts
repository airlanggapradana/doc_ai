import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response, @Req() req: Request) {
    try {
      const users = await this.userService.findAll();
      const { limit } = req.query;

      if (limit) {
        const limitedUsers = users.slice(0, parseInt(limit as string));
        return res.status(HttpStatus.OK).json({
          message: `${limit as string} users fetched successfully`,
          result: limitedUsers,
        });
      }

      if (users.length <= 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'No users found',
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'users fetched successfully',
        result: users,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error fetching users',
      });
    }
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'User fetched successfully',
        result: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching user',
      });
    }
  }

  @Patch(':userId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @Res() res: Response,
  ) {
    try {
      const { email, name, password } = updateUserDto;

      if (!email && !name && !password) {
        return res.status(HttpStatus.NOT_ACCEPTABLE).json({
          message: 'Please provide at least one field to update',
        });
      }

      const updatedUser = await this.userService.update(userId, updateUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        result: updatedUser,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating user',
      });
    }
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const deletedUser = await this.userService.remove(userId);

      if (!deletedUser) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        result: deletedUser,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting user',
      });
    }
  }
}
