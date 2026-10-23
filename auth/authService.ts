import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { HttpError, validarInput } from '../helper/helperFunctions.ts'
import type { Credenciais } from '../models/TiposAuxiliares.ts';
import { credenciaisSchema } from '../schemas/CredenciaisSchema.ts';
import {AuthRepository} from './authRepository.ts'
import type { UsuarioInput, UsuarioPublico } from '../models/UsuarioModel.ts';
import { UsuarioService } from '../usuario/UsuarioService.ts'
import { UsuarioRepository } from '../usuario/UsuarioRepository.ts';

dotenv.config()

const authRepository = new AuthRepository()
const usuarioService = new UsuarioService(new UsuarioRepository)

export async function login(email: unknown, senha: unknown): Promise<string> {
    const credenciais = validarInput<Credenciais>(credenciaisSchema, { email, senha })
    const usuario = await authRepository.getByEmail(credenciais.email)

    if (!usuario) {
        throw new HttpError(401, 'E-mail ou senha inválidos')
    }

    const senhaValida = await bcrypt.compare(credenciais.senha, usuario.senhaHash)

    if (usuario.status !== 'ativo' || !senhaValida ) {
        throw new HttpError(401, 'E-mail ou senha inválidos')
    }

    const token = jwt.sign(
        { permissao: usuario.permissao },
        process.env.JWT_SECRET as string,
        { algorithm: 'HS256', expiresIn: '1h', subject: String(usuario.id) })

    return token
}

export async function register(usuario: UsuarioInput): Promise<UsuarioPublico> {
    return usuarioService.createUsuario(usuario)
}
