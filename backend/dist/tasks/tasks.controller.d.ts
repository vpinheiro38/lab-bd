import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        message: any;
        success: any;
        data: {
            success: boolean;
            message: string;
            data: any;
        } | {
            success: boolean;
            message: string;
            data?: undefined;
        };
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    findAll(user: string, completed: string, category: any, priority: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        message: any;
        success: boolean;
        data: {
            success: boolean;
            message: string;
            data: any;
        } | {
            success: boolean;
            message: string;
            data?: undefined;
        };
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    remove(id: string): Promise<{
        message: any;
        success: boolean;
    }>;
}
