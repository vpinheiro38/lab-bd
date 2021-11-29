import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    description:string;
    completed_at:string;
    deadline_at:string;
    task_priority: string;
    task_user:string;
}
