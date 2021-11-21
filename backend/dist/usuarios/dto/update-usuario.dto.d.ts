import { CreateUsuarioDto } from './create-usuario.dto';
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    name: string;
    email: string;
    password: string;
}
export {};
