import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { EspacoFisicoService } from './EspacoFisicoService.ts'

export class EspacoFisicoController {
    constructor(private readonly service: EspacoFisicoService) {}

    public async postEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const espacoFisico = await this.service.createEspacoFisico(req.body);

            return res.status(201).json(espacoFisico)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const { offset, limit } = req.query
            const espacosFisicos = await this.service.listEspacosFisicos(offset, limit);

            return res.status(200).json(espacosFisicos)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const espacoFisico = await this.service.getEspacoFisico(id);

            return res.status(200).json(espacoFisico)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.updateEspacoFisicoParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.updateEspacoFisico(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteEspacoFisico(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.service.deleteEspacoFisico(id);
            
            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
