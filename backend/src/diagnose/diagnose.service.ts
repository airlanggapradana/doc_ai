import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DiagnoseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, createDiagnoseDto: Prisma.DiagnoseCreateInput) {
    const newDiagnose = await this.databaseService.diagnose.create({
      data: {
        ...createDiagnoseDto,
        userDiagnose: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newDiagnose;
  }

  async findOne(DiagnoseId: string) {
    const diagnose = await this.databaseService.diagnose.findUnique({
      where: {
        id: DiagnoseId,
      },
    });

    if (!diagnose) {
      throw new BadRequestException('Diagnose not found');
    }

    return diagnose;
  }

  async remove(DiagnoseId: string) {
    const diagnose = await this.databaseService.diagnose.delete({
      where: {
        id: DiagnoseId,
      },
    });

    if (!diagnose) {
      throw new BadRequestException('Diagnose not found');
    }

    return diagnose;
  }
}
