import type { Request, Response } from 'express';
import { handleError } from '../helper/helperFunctions.ts'

import { ProfessorService } from './ProfessorService.ts';
import type {Professor} from '../models/ProfessorModel.ts'

export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}

    public async postProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const professor = await this.professorService.createProfessor(req.body);
            
            return res.status(201).json(professor)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const { offset, limit } = req.query;
            const professores = await this.professorService.listProfessores(offset, limit);

            return res.status(200).json(professores);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const professor = await this.professorService.getProfessor(id);

            return res.status(200).json(professor);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.professorService.updateProfessorParcial(id, req.body)

            return res.sendStatus(204);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.professorService.updateProfessor(id, req.body)

            return res.sendStatus(204);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteProfessor(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.professorService.deleteProfessor(id);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
