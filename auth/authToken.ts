import jwt from 'jsonwebtoken'
import type { Permissao } from '../models/TiposAuxiliares.ts'

export interface DadosToken {
    id: number
    permissao: Permissao
}

export function obterJwtSecret(): string {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('Missing required environment variable: JWT_SECRET')
    }

    if (Buffer.byteLength(secret, 'utf8') < 32) {
        throw new Error('JWT_SECRET must contain at least 32 bytes')
    }

    return secret
}

export function gerarToken(dados: DadosToken): string {
    return jwt.sign(
        { permissao: dados.permissao },
        obterJwtSecret(),
        { algorithm: 'HS256', expiresIn: '1h', subject: String(dados.id) },
    )
}
