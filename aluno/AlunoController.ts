import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { AlunoService } from './AlunoService.ts'
import { AlunoRepository } from './AlunoRepository.ts';

export class AlunoController {
    constructor(private alunoService: AlunoService) {
        this.alunoService = alunoService
    }

    public async postAluno(req: Request, res: Response): Promise<Response> {
        try {
            const aluno = await this.alunoService.createAluno(req.body);

            return res.status(201).json(aluno)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listAluno(req: Request, res: Response): Promise<Response> {
        try {
            const { limit, page} = req.query;
            const alunos = await this.alunoService.listAlunos(limit, page);

            return res.status(200).json(alunos)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getAluno(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const aluno = await this.alunoService.getAluno(id);

            return res.status(200).json(aluno)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchAluno(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.alunoService.updateAlunoParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putAluno(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.alunoService.updateAluno(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteAluno(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.alunoService.deleteAluno(id);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
