import bcrypt from 'bcrypt'
import Joi from 'joi'
import { HttpError, validarInput } from '../helper/helperFunctions.ts'
import {AuthRepository} from './authRepository.ts'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface Credenciais {
    email: string
    senha: string
}

const credenciaisSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    senha: Joi.string().required(),
})

const authRepository = new AuthRepository()

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
