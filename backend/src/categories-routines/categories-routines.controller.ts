import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesRoutinesService } from './categories-routines.service';
import { CreateCategoriesRoutineDto } from './dto/create-categories-routine.dto';
import { UpdateCategoriesRoutineDto } from './dto/update-categories-routine.dto';

@Controller('categories-routines')
export class CategoriesRoutinesController {
  constructor(private readonly categoriesRoutinesService: CategoriesRoutinesService) {}

  @Post()
  create(@Body() createCategoriesRoutineDto: CreateCategoriesRoutineDto) {
    return this.categoriesRoutinesService.create(createCategoriesRoutineDto);
  }

  @Get()
  findAll() {
    return this.categoriesRoutinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesRoutinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesRoutineDto: UpdateCategoriesRoutineDto) {
    return this.categoriesRoutinesService.update(+id, updateCategoriesRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesRoutinesService.remove(+id);
  }
}
