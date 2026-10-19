import express from 'express'

import {UsuarioController} from './UsuarioController.ts'
import { UsuarioRepository } from './UsuarioRepository.ts';
import { UsuarioService } from './UsuarioService.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts'

const usuarioRepository = new UsuarioRepository;
const usuarioService = new UsuarioService(usuarioRepository)
const usuarioController = new UsuarioController(usuarioService);

export const usuarioRoutes = express.Router();

usuarioRoutes.post('/', usuarioController.postUsuario.bind(usuarioController));
usuarioRoutes.get('/', authMiddleware, usuarioController.listUsuario.bind(usuarioController));
usuarioRoutes.get('/:id', authMiddleware, usuarioController.getUsuario.bind(usuarioController));
usuarioRoutes.patch('/:id', authMiddleware, usuarioController.patchUsuario.bind(usuarioController));
usuarioRoutes.put('/:id', authMiddleware, usuarioController.putUsuario.bind(usuarioController));
usuarioRoutes.delete('/:id', authMiddleware, usuarioController.deleteUsuario.bind(usuarioController));
