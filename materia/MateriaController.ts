import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { MateriaService } from './MateriaService.ts'

export class MateriaController {
    constructor(private service: MateriaService) {}

    public async postMateria(req: Request, res: Response): Promise<Response> {
        try {
            const materia = await this.service.createMateria(req.body);

            return res.status(201).json(materia)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listMateria(req: Request, res: Response): Promise<Response> {
        try {
            const { limit, page } = req.query;
            const materias = await this.service.listMaterias(limit, page);

            return res.status(200).json(materias)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getMateria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const materia = await this.service.getMateria(id);

            return res.status(200).json(materia)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchMateria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateMateriaParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putMateria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateMateria(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteMateria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.deleteMateria(id);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
