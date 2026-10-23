import bcrypt from 'bcrypt'
import type { UsuarioInput, UsuarioOptional, UsuarioPersistido, UsuarioPublico } from '../models/UsuarioModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { usuarioSchema } from '../schemas/UsuarioSchema.ts'
import { UsuarioRepository } from './UsuarioRepository.ts'

const RODADAS_BCRYPT = 12

export class UsuarioService {
    constructor(private repository: UsuarioRepository) {}

    public async createUsuario(usuario: UsuarioInput): Promise<UsuarioPublico> {
        const usuarioValidado = validarInput<UsuarioInput>(usuarioSchema, usuario);
        const senhaHash = await bcrypt.hash(usuarioValidado.senha, RODADAS_BCRYPT);

        if (await this.repository.getByEmail(usuarioValidado.email)) {
            throw new HttpError(409, 'Usuário com esse e-mail já cadastrado')
        }

        const { senha: _senha, ...dados } = usuarioValidado

        const novoUsuario: UsuarioPersistido = {
            ...dados,
            status: usuarioValidado.status ?? 'ativo',
            senhaHash,
            dataDeCriacao: new Date(),
        }

        return this.repository.createUsuario(novoUsuario)
    }

    public async getUsuario(id: unknown): Promise<UsuarioPublico> {
        const usuario = await this.repository.getUsuario(validarId(id));

        if (!usuario) throw new HttpError(404, 'Usuário não encontrado')
            
        return usuario
    }

    public async listUsuarios(limit?: unknown, page?: unknown): Promise<UsuarioPublico[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.repository.listUsuarios(paginacao.limit, paginacao.page)
    }

    public async updateUsuario(id: unknown, usuario: UsuarioInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<UsuarioInput>(usuarioSchema, usuario);

        await this.getUsuario(idValidado);
        if (await this.repository.getByEmail(atualizacao.email)) {
            throw new HttpError(409, 'Usuário com esse e-mail já cadastrado')
        }

        const senhaHash = await bcrypt.hash(atualizacao.senha, RODADAS_BCRYPT)
        const { senha: _senha, ...dados } = atualizacao

        await this.repository.updateUsuario(idValidado, {
            ...dados,
            status: atualizacao.status ?? 'ativo',
            senhaHash,
        })
    }

    public async updateUsuarioParcial(id: unknown, usuario: UsuarioOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<UsuarioInput>(usuarioSchema, usuario, true);

        await this.getUsuario(idValidado);
        if (await this.repository.getByEmail(atualizacao.email)) {
            throw new HttpError(409, 'Usuário com esse e-mail já cadastrado')
        }

        const senhaHash = await bcrypt.hash(atualizacao.senha, RODADAS_BCRYPT)
        const { senha: _senha, ...dados } = atualizacao

        await this.repository.updateUsuario(idValidado, {
            ...dados,
            status: atualizacao.status ?? 'ativo',
            senhaHash,
        })
    }

    public async deleteUsuario(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getUsuario(idValidado);

        await this.repository.deleteUsuario(idValidado)
    }
}
