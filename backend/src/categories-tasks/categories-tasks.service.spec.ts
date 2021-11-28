import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesTasksService } from './categories-tasks.service';

describe('CategoriesTasksService', () => {
  let service: CategoriesTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesTasksService],
    }).compile();

    service = module.get<CategoriesTasksService>(CategoriesTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
