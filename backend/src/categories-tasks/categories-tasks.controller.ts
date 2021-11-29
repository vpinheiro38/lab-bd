import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesTasksService } from './categories-tasks.service';
import { CreateCategoriesTaskDto } from './dto/create-categories-task.dto';
import { UpdateCategoriesTaskDto } from './dto/update-categories-task.dto';

@Controller('categories-tasks')
export class CategoriesTasksController {
  constructor(private readonly categoriesTasksService: CategoriesTasksService) {}

  @Post()
  create(@Body() createCategoriesTaskDto: CreateCategoriesTaskDto) {
    return this.categoriesTasksService.create(createCategoriesTaskDto);
  }

  @Get()
  findAll(@Query('task') task: string) {
    return this.categoriesTasksService.findAll(task);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesTaskDto: UpdateCategoriesTaskDto) {
    return this.categoriesTasksService.update(+id, updateCategoriesTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesTasksService.remove(+id);
  }
}
