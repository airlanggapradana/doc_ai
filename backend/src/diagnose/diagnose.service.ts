import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DiagnoseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, createDiagnoseDto: Prisma.DiagnoseCreateInput) {
    const newDiagnose = await this.databaseService.diagnose.create({
      include: {
        hasil_diagnosa: {
          include: {
            prediksi_penyakit: true,
            rekomendasi_makanan: true,
            rekomendasi_minuman: true,
            rekomendasi_olahraga: true,
          },
        },
      },
      data: {
        ...createDiagnoseDto,
        hasil_diagnosa: {
          create: {
            diagnosa_umum:
              createDiagnoseDto.hasil_diagnosa.create.diagnosa_umum,
            prediksi_penyakit: {
              create:
                createDiagnoseDto.hasil_diagnosa.create.prediksi_penyakit
                  .create,
            },
            rekomendasi_makanan: {
              create:
                createDiagnoseDto.hasil_diagnosa.create.rekomendasi_makanan
                  .create,
            },
            rekomendasi_minuman: {
              create:
                createDiagnoseDto.hasil_diagnosa.create.rekomendasi_minuman
                  .create,
            },
            rekomendasi_olahraga: {
              create:
                createDiagnoseDto.hasil_diagnosa.create.rekomendasi_olahraga
                  .create,
            },
          },
        },
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
