import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/domain/usuario.service';


export type User = {
    id: number;
    username: string;
    name: string;
    password: string;
}

@Injectable()
export class UsersService {

    constructor(
        private readonly usuarioService: UsuarioService) { }
    
    async findOne(username: string): Promise<User> {
        const usuario = await this.usuarioService.usuario({ username });

        if (usuario) {
            return { ...usuario, name: usuario.nome }
        }

        return null;
    }
}
