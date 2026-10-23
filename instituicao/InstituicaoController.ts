import type { Request, Response } from 'express';
import { handleError } from '../helper/helperFunctions.ts'
import { InstituicaoService } from './InstituicaoService.ts';

export class InstituicaoController {
    constructor(private instituicaoService: InstituicaoService) {}

    public async postInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const instituicao = await this.instituicaoService.createInstituicao(req.body);

            return res.status(201).json(instituicao);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const { limit, page } = req.query
            const instituicoes = await this.instituicaoService.listInstituicoes(limit, page);

            return res.status(200).json(instituicoes);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const instituicao = await this.instituicaoService.getInstituicao(id);

            return res.status(200).json(instituicao);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.instituicaoService.updateInstituicaoParcial(id, req.body);

            return res.sendStatus(204);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.instituicaoService.updateInstituicao(id, req.body);

            return res.sendStatus(204);
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteInstituicao(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.instituicaoService.deleteInstituicao(id);

            return res.sendStatus(204);
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
