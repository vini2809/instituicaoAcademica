import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { MatriculaService } from './MatriculaService.ts'

export class MatriculaController {
    constructor(private readonly service: MatriculaService) {}

    public async postMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const matricula = await this.service.createMatricula(req.body);

            return res.status(201).json(matricula)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const { offset, limit } = req.query
            const matriculas = await this.service.listMatriculas(offset, limit);

            return res.status(200).json(matriculas)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const matricula = await this.service.getMatricula(id);

            return res.status(200).json(matricula)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateMatriculaParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateMatricula(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteMatricula(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.deleteMatricula(id);
            
            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
