import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { CursoService } from './CursoService.ts'

export class CursoController {
    constructor(private service: CursoService) {}

    public async postCurso(req: Request, res: Response): Promise<Response> {
        try {
            const curso = await this.service.createCurso(req.body);

            return res.status(201).json(curso)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listCurso(req: Request, res: Response): Promise<Response> {
        try {
            const { limit, page } = req.query;
            const cursos = await this.service.listCursos(limit, page);

            return res.status(200).json(cursos)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getCurso(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const curso = await this.service.getCurso(id);

            return res.status(200).json(curso)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchCurso(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.updateCursoParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putCurso(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.updateCurso(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteCurso(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.deleteCurso(id)

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
