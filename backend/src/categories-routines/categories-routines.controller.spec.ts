import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRoutinesController } from './categories-routines.controller';
import { CategoriesRoutinesService } from './categories-routines.service';

describe('CategoriesRoutinesController', () => {
  let controller: CategoriesRoutinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesRoutinesController],
      providers: [CategoriesRoutinesService],
    }).compile();

    controller = module.get<CategoriesRoutinesController>(CategoriesRoutinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
