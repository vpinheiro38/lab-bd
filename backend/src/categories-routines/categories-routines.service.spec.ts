import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRoutinesService } from './categories-routines.service';

describe('CategoriesRoutinesService', () => {
  let service: CategoriesRoutinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesRoutinesService],
    }).compile();

    service = module.get<CategoriesRoutinesService>(CategoriesRoutinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
