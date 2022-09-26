import { Test, TestingModule } from '@nestjs/testing';
import { TruyensService } from './truyens.service';

describe('TruyensService', () => {
  let service: TruyensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruyensService],
    }).compile();

    service = module.get<TruyensService>(TruyensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
