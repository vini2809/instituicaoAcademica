import type {Permissao, Status} from './TiposAuxiliares.ts'

export interface Usuario {
    id: number;
    nome: string,
    email: string,
    senhaHash: string,
    permissao: Permissao
    status: Status,
    dataDeCriacao: Date
}

export type UsuarioPublico = Omit<Usuario, 'senhaHash'>
export type UsuarioInput = Omit<Usuario, 'id' | 'senhaHash' | 'dataDeCriacao' | 'status'> & { senha: string; status?: Status }
export type UsuarioOptional = Partial<UsuarioInput>
export type UsuarioPersistido = Omit<Usuario, 'id'>
