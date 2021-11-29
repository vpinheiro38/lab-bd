import { CreateTaskDto } from './create-task.dto';
declare const UpdateTaskDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTaskDto>>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
    description: string;
    completed_at: string;
    deadline_at: string;
    task_priority: string;
    task_user: string;
}
export {};
