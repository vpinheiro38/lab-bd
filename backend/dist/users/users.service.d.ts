import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
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
    login(loginUserDto: LoginUserDto): Promise<{
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
    findOne(identificador: number): Promise<{
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
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: number): Promise<{
        message: any;
        success: boolean;
    }>;
}
