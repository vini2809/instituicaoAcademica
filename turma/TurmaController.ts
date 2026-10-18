import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { TurmaService } from './TurmaService.ts'

export class TurmaController {
    constructor(private readonly service: TurmaService) {}

    public async postTurma(req: Request, res: Response): Promise<Response> {
        try {
            const turma = await this.service.createTurma(req.body);

            return res.status(201).json(turma)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listTurma(req: Request, res: Response): Promise<Response> {
        try {
            const { offset, limit } = req.query;
            const turmas = await this.service.listTurmas(offset, limit)
            
            return res.status(200).json(turmas)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getTurma(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const turma = await this.service.getTurma(id);

            return res.status(200).json(turma)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchTurma(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            await this.service.updateTurmaParcial(id, req.body)

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putTurma(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            await this.service.updateTurma(id, req.body)

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteTurma(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            await this.service.deleteTurma(id)
            
            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
