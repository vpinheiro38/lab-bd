import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
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
    findAll(user: string, completed: string, category: string, priority: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    findOne(identificador: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
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
    remove(id: number): Promise<{
        message: any;
        success: boolean;
    }>;
}
