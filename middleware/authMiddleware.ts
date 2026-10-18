import type { NextFunction, Request, Response } from 'express'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { obterJwtSecret } from '../auth/authToken.ts'
import type { Permissao } from '../models/TiposAuxiliares.ts'

export interface UsuarioAutenticado {
    id: number
    permissao: Permissao
}

// adiciona 'usuarioAutenticado' no Request do express para depois de validar a autenticação
declare global {
    namespace Express {
        interface Request {
            usuarioAutenticado?: UsuarioAutenticado
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authorization = req.get('authorization')
    const correspondencia = authorization?.split(' ');

    if (!correspondencia) {
        res.status(401).json({ error: 'Token de autenticação não informado' })
        return
    }

    try {
        const payload = jwt.verify(correspondencia[1], obterJwtSecret(), {
            algorithms: ['HS256'],
        })

        if (!payload || typeof payload === 'string') {
            res.status(401).json({ error: 'Token de autenticação inválido' })
            return
        }

        req.usuarioAutenticado = {
            id: Number(payload.sub),
            permissao: payload.permissao,
        }
        next()
    } catch (erro) {
        if (erro instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Token de autenticação inválido ou expirado' })
            return
        }

        next(erro)
    }
}
