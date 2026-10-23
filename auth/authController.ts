import type { Request, Response } from 'express'
import { handleError } from '../helper/helperFunctions.ts'
import * as authService from './authService.ts'

export const login = async (req: Request, res: Response) => {
    try {
        const {email, senha} = req.body;
        const token = await authService.login(email, senha)

        return res.status(200).json({ token })
    } catch (erro) {
        return handleError(res, erro)
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const usuario = await authService.register(req.body);

        return res.status(201).json(usuario)
    } catch (erro) {
        return handleError(res, erro)
    }
}
