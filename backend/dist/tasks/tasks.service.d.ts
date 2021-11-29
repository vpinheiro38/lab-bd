import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    create(createTaskDto: CreateTaskDto): Promise<{
        message: any;
        success: any;
        data: {
            succes: boolean;
            message: string;
            data: any;
            success?: undefined;
        } | {
            success: boolean;
            message: string;
            succes?: undefined;
            data?: undefined;
        };
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    findAll(user: string, completed: string, category: string, priority: string): Promise<{
        succes: boolean;
        message: string;
        data: any;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        succes?: undefined;
        data?: undefined;
    }>;
    findOne(identificador: number): Promise<{
        succes: boolean;
        message: string;
        data: any;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        succes?: undefined;
        data?: undefined;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        message: any;
        success: boolean;
        data: {
            succes: boolean;
            message: string;
            data: any;
            success?: undefined;
        } | {
            success: boolean;
            message: string;
            succes?: undefined;
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
