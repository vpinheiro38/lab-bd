import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        message: any;
        success: boolean;
    }>;
    findAll(): string;
    findOne(id: string): Promise<{
        id: any;
        email: any;
        name: any;
        created_at: any;
        updated_at: any;
    }>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        message: any;
        success: boolean;
    }>;
    remove(id: string): Promise<{
        message: any;
        success: boolean;
    }>;
}
