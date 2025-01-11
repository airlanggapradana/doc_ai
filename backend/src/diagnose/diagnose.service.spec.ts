import { Test, TestingModule } from '@nestjs/testing';
import { DiagnoseService } from './diagnose.service';

describe('DiagnoseService', () => {
  let service: DiagnoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnoseService],
    }).compile();

    service = module.get<DiagnoseService>(DiagnoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
