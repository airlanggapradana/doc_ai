import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [UserController],
  providers: [DatabaseService, UserService],
})
export class UserModule {}
