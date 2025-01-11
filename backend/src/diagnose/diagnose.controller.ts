import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('diagnose')
export class DiagnoseController {
  constructor(private readonly diagnoseService: DiagnoseService) {}

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDiagnoseDto: Prisma.DiagnoseCreateInput,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    if (!createDiagnoseDto) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Diagnose data is required',
      });
    }

    const newDiagnose = await this.diagnoseService.create(
      userId,
      createDiagnoseDto,
    );

    return res.status(HttpStatus.CREATED).json({
      message: 'Diagnose created successfully',
      result: newDiagnose,
    });
  }

  @Get(':diagnoseId')
  async findOne(@Param('diagnoseId') diagnoseId: string, @Res() res: Response) {
    const diagnose = await this.diagnoseService.findOne(diagnoseId);

    if (!diagnose) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Diagnose not found',
      });
    }

    res.status(HttpStatus.OK).json({
      message: 'Diagnose found',
      result: diagnose,
    });
  }

  @Delete(':diagonesId')
  remove(@Param('diagonesId') diagonesId: string, @Res() res: Response) {
    const diagnose = this.diagnoseService.remove(diagonesId);

    if (!diagnose) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Diagnose not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Diagnose deleted successfully',
    });
  }
}
