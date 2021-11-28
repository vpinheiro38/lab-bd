import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesRoutineDto } from './create-categories-routine.dto';

export class UpdateCategoriesRoutineDto extends PartialType(CreateCategoriesRoutineDto) {}
