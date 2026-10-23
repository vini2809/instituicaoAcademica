import { database } from '../database/database.ts'
import type {
    Usuario,
    UsuarioPersistido,
    UsuarioPublico,
} from '../models/UsuarioModel.ts'

const colunasPublicas = ['id', 'nome', 'email', 'permissao', 'status', 'dataDeCriacao'] as const

export class UsuarioRepository {
    public async createUsuario(usuario: UsuarioPersistido): Promise<UsuarioPublico> {
        const [novoUsuario] = await database<Usuario>('usuario')
            .insert(usuario)
            .returning(colunasPublicas)

        return novoUsuario
    }

    public async getUsuario(id: number): Promise<UsuarioPublico | undefined> {
        return database<Usuario>('usuario')
            .select(...colunasPublicas)
            .where({ id })
            .first()
    }

    public async listUsuarios(limit: number, page: number): Promise<UsuarioPublico[]> {
        const offset = limit * (page - 1)
        
        return database<Usuario>('usuario')
            .select(...colunasPublicas)
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async getByEmail(email: string): Promise<Pick<UsuarioPublico, 'id' | 'email'> | undefined> {
        return database<Usuario>('usuario')
            .select('id', 'email')
            .whereRaw('LOWER(??) = ?', ['email', email])
            .first()
    }

    public async updateUsuario(id: number,usuario: Partial<Omit<UsuarioPersistido, 'id'>>,): Promise<void> {
        await database<UsuarioPublico>('usuario')
            .update(usuario)
            .where({ id })
    }

    public async deleteUsuario(id: number): Promise<void> {
        await database<UsuarioPublico>('usuario')
            .delete()
            .where({ id })
    }

}
