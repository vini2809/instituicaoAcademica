import type { NextFunction, Request, Response } from 'express'
import type { Permissao } from '../models/TiposAuxiliares.ts'

const acessosProfessor = new Set([
    'alunos',
    'avaliacoes',
    'materias',
    'turmas',
])

function permissaoValida(valor: unknown): valor is Permissao {
    return valor === 'aluno' || valor === 'professor' || valor === 'administrador'
}

function temAcesso(permissao: Permissao, metodo: string, path: string): boolean {
    if (permissao === 'administrador') {
        return true
    }

    if (metodo === 'GET') {
        return true
    }

    if (permissao === 'aluno') {
        return false
    }

    const entidade = path.split('/').filter(Boolean)[0]?.toLowerCase()
    return entidade !== undefined && acessosProfessor.has(entidade)
}

export function permissionMiddleware(req: any, res: Response, next: NextFunction) {
    const permissao = req.usuarioAutenticado?.permissao

    if (!permissaoValida(permissao)) {
        res.status(401).json({ error: 'Usuário não autenticado' })
        return
    }

    if (!temAcesso(permissao, req.method, req.path)) {
        res.status(403).json({ erro: 'Você não tem permissão para acessar esta função' })
        return
    }

    next()
}
