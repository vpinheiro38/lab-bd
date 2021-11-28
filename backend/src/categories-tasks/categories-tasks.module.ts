import { Module } from '@nestjs/common';
import { CategoriesTasksService } from './categories-tasks.service';
import { CategoriesTasksController } from './categories-tasks.controller';

@Module({
  controllers: [CategoriesTasksController],
  providers: [CategoriesTasksService]
})
export class CategoriesTasksModule {}
