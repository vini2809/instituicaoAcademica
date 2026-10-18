import { database } from '../database/database.ts'
import type { Usuario } from '../models/UsuarioModel.ts'

export type CredenciaisUsuario = Pick<
    Usuario,
    'id' | 'email' | 'senhaHash' | 'permissao' | 'status'
>

export class AuthRepository {
    public async getByEmail(email: string): Promise<CredenciaisUsuario> {
        return database('usuario')
            .select('id', 'email', 'senhaHash', 'permissao', 'status')
            .whereRaw('LOWER(??) = ?', ['email', email])
            .first()
    }
}