import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    description:string;
    completed:boolean;
    task_priority: string;
    task_user:string;
}
