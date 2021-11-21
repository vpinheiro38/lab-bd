import { PrioritiesService } from './priorities.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
export declare class PrioritiesController {
    private readonly prioritiesService;
    constructor(prioritiesService: PrioritiesService);
    create(createPriorityDto: CreatePriorityDto): Promise<{
        message: any;
        success: boolean;
        data: {
            description: any;
            priority_number: any;
            created_at: any;
            updated_at: any;
            success?: undefined;
            message?: undefined;
        } | {
            success: boolean;
            message: string;
            description?: undefined;
            priority_number?: undefined;
            created_at?: undefined;
            updated_at?: undefined;
        };
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        description: any;
        priority_number: any;
        created_at: any;
        updated_at: any;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        description?: undefined;
        priority_number?: undefined;
        created_at?: undefined;
        updated_at?: undefined;
    }>;
    update(id: string, updatePriorityDto: UpdatePriorityDto): string;
    remove(id: string): string;
}
