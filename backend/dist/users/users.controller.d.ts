import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: any;
        success: boolean;
        data: {
            id: any;
            email: any;
            name: any;
            created_at: any;
            updated_at: any;
            success?: undefined;
            message?: undefined;
        } | {
            success: boolean;
            message: string;
            id?: undefined;
            email?: undefined;
            name?: undefined;
            created_at?: undefined;
            updated_at?: undefined;
        };
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    findAll(): string;
    findOne(id: string): Promise<{
        id: any;
        email: any;
        name: any;
        created_at: any;
        updated_at: any;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        id?: undefined;
        email?: undefined;
        name?: undefined;
        created_at?: undefined;
        updated_at?: undefined;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: any;
        success: boolean;
        data: {
            id: any;
            email: any;
            name: any;
            created_at: any;
            updated_at: any;
            success?: undefined;
            message?: undefined;
        } | {
            success: boolean;
            message: string;
            id?: undefined;
            email?: undefined;
            name?: undefined;
            created_at?: undefined;
            updated_at?: undefined;
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
