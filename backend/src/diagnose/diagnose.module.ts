import { Module } from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';
import { DiagnoseController } from './diagnose.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [DiagnoseController],
  providers: [DatabaseService, DiagnoseService],
})
export class DiagnoseModule {}
