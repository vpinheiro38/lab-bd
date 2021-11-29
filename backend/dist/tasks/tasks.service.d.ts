import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    create(createTaskDto: CreateTaskDto): Promise<{
        message: any;
        success: boolean;
        data: {
            user_name: any;
            priority_id: any;
            priority_description: any;
            priority_number: any;
            id: any;
            description: any;
            completed: any;
            task_priority: any;
            task_user: any;
            created_at: any;
            updated_at: any;
            user_email: any;
            success?: undefined;
            message?: undefined;
        } | {
            success: boolean;
            message: string;
            user_name?: undefined;
            priority_id?: undefined;
            priority_description?: undefined;
            priority_number?: undefined;
            id?: undefined;
            description?: undefined;
            completed?: undefined;
            task_priority?: undefined;
            task_user?: undefined;
            created_at?: undefined;
            updated_at?: undefined;
            user_email?: undefined;
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
        user_name: any;
        priority_id: any;
        priority_description: any;
        priority_number: any;
        id: any;
        description: any;
        completed: any;
        task_priority: any;
        task_user: any;
        created_at: any;
        updated_at: any;
        user_email: any;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        user_name?: undefined;
        priority_id?: undefined;
        priority_description?: undefined;
        priority_number?: undefined;
        id?: undefined;
        description?: undefined;
        completed?: undefined;
        task_priority?: undefined;
        task_user?: undefined;
        created_at?: undefined;
        updated_at?: undefined;
        user_email?: undefined;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        message: any;
        success: boolean;
        data: {
            user_name: any;
            priority_id: any;
            priority_description: any;
            priority_number: any;
            id: any;
            description: any;
            completed: any;
            task_priority: any;
            task_user: any;
            created_at: any;
            updated_at: any;
            user_email: any;
            success?: undefined;
            message?: undefined;
        } | {
            success: boolean;
            message: string;
            user_name?: undefined;
            priority_id?: undefined;
            priority_description?: undefined;
            priority_number?: undefined;
            id?: undefined;
            description?: undefined;
            completed?: undefined;
            task_priority?: undefined;
            task_user?: undefined;
            created_at?: undefined;
            updated_at?: undefined;
            user_email?: undefined;
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
