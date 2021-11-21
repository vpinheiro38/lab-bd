import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        message: any;
        success: boolean;
    }>;
    findAll(): string;
    findOne(identificator: number): Promise<{
        id: any;
        email: any;
        name: any;
        created_at: any;
        updated_at: any;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        message: any;
        success: boolean;
    }>;
    remove(id: number): Promise<{
        message: any;
        success: boolean;
    }>;
}
