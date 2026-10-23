import type { NextFunction, Request, Response } from 'express'
import type { Permissao } from '../models/TiposAuxiliares.ts'

// Administrador tem acesso a todos os métodos do sistema.
// Aluno tem acesso apenas aos métodos GET.
// Professor tem acesso a todos os métodos GET e aos
// métodos POST, PATCH, PUT e DELETE apenas das entidades
// Alunos, Avaliações, Matérias e Turmas.

const acessosProfessor = new Set([
    'alunos',
    'avaliacoes',
    'materias',
    'turmas',
])

export function permissionMiddleware(req: Request, res: Response, next: NextFunction) {
    const permissao = req.usuarioAutenticado?.permissao

    if (!temAcesso(permissao as Permissao, req.method, req.path)) {
        res.status(403).json({ erro: 'Você não tem permissão para acessar esta função' })
        return
    }

    next()
}

function temAcesso(permissao: Permissao, metodo: string, path: string): boolean {
    // administrador tem acesso a todas as funções
    if (permissao === 'administrador') {
        return true
    }

    // todas as permissões tem acessos a GET
    if (metodo === 'GET') {
        return true
    }

    // o aluno só tem acesso a GET
    if (permissao === 'aluno') {
        return false
    }

    // professor tem acesso a POST, PATCH, PUT e DELETE
    // apenas das entidades Alunos, Avaliações, Matérias e Turmas
    const entidade = path.split('/').filter(Boolean)[0]?.toLowerCase()
    return acessosProfessor.has(entidade)
}