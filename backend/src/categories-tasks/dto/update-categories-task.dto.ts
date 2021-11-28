import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesTaskDto } from './create-categories-task.dto';

export class UpdateCategoriesTaskDto extends PartialType(CreateCategoriesTaskDto) {}
