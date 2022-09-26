import { Test, TestingModule } from '@nestjs/testing';
import { TruyensController } from './truyens.controller';

describe('TruyensController', () => {
  let controller: TruyensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruyensController],
    }).compile();

    controller = module.get<TruyensController>(TruyensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
