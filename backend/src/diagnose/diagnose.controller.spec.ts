import { Test, TestingModule } from '@nestjs/testing';
import { DiagnoseController } from './diagnose.controller';
import { DiagnoseService } from './diagnose.service';

describe('DiagnoseController', () => {
  let controller: DiagnoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnoseController],
      providers: [DiagnoseService],
    }).compile();

    controller = module.get<DiagnoseController>(DiagnoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
