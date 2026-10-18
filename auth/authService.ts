import bcrypt from 'bcrypt'
import Joi from 'joi'
import { HttpError, validarInput } from '../helper/helperFunctions.ts'
import { AuthRepository, CredenciaisUsuario } from './authRepository.ts'
import { gerarToken } from './authToken.ts'

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
    const senhaValida = await bcrypt.compare(credenciais.senha, usuario.senhaHash)

    if (!usuario || usuario.status !== 'ativo' || !senhaValida ) {
        throw new HttpError(401, 'E-mail ou senha inválidos')
    }

    const token = gerarToken({ id: usuario.id, permissao: usuario.permissao });

    return token
}
