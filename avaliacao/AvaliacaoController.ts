import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { AvaliacaoService } from './AvaliacaoService.ts'

export class AvaliacaoController {
    constructor(private avaliacaoService: AvaliacaoService) {}

    public async postAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const avaliacao = await this.avaliacaoService.createAvaliacao(req.body);

            return res.status(201).json(avaliacao)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const { limit, page } = req.query;
            const avaliacoes = await this.avaliacaoService.listAvaliacoes(limit, page);
            
            return res.status(200).json(avaliacoes)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const avaliacao = await this.avaliacaoService.getAvaliacao(id);

            return res.status(200).json(avaliacao)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.avaliacaoService.updateAvaliacaoParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.avaliacaoService.updateAvaliacao(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.avaliacaoService.deleteAvaliacao(req.params.id);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
