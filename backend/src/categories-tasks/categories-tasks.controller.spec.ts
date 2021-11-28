import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesTasksController } from './categories-tasks.controller';
import { CategoriesTasksService } from './categories-tasks.service';

describe('CategoriesTasksController', () => {
  let controller: CategoriesTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesTasksController],
      providers: [CategoriesTasksService],
    }).compile();

    controller = module.get<CategoriesTasksController>(CategoriesTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
