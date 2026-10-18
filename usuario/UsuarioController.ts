import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import { UsuarioService } from './UsuarioService.ts'

export class UsuarioController {
    constructor(private readonly service: UsuarioService) {}

    public async postUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const usuario = await this.service.createUsuario(req.body);

            return res.status(201).json(usuario)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async listUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { offset, limit } = req.query;
            const usuarios = await this.service.listUsuarios(offset, limit)

            return res.status(200).json(usuarios)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async getUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const usuario = await this.service.getUsuario(id);

            return res.status(200).json(usuario)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async patchUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateUsuarioParcial(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async putUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.updateUsuario(id, req.body);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }

    public async deleteUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.deleteUsuario(id);

            return res.sendStatus(204)
        } catch (erro) {
            return handleError(res, erro)
        }
    }
}
