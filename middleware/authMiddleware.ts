import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { Permissao } from '../models/TiposAuxiliares.ts'
dotenv.config()

export interface UsuarioAutenticado {
    id: number
    permissao: Permissao
}

// adiciona 'usuarioAutenticado' no Request do express para depois de validar a permissão
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
        const payload = jwt.verify(correspondencia[1],
            process.env.JWT_SECRET as string, {
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
