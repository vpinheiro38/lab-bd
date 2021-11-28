import { Module } from '@nestjs/common';
import { CategoriesRoutinesService } from './categories-routines.service';
import { CategoriesRoutinesController } from './categories-routines.controller';

@Module({
  controllers: [CategoriesRoutinesController],
  providers: [CategoriesRoutinesService]
})
export class CategoriesRoutinesModule {}
