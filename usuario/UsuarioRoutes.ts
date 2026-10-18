import express from 'express'

import {UsuarioController} from './UsuarioController.ts'
import { UsuarioRepository } from './UsuarioRepository.ts';
import { UsuarioService } from './UsuarioService.ts';

const usuarioRepository = new UsuarioRepository;
const usuarioService = new UsuarioService(usuarioRepository)
const usuarioController = new UsuarioController(usuarioService);

export const usuarioRoutes = express.Router();

usuarioRoutes.post('/', usuarioController.postUsuario.bind(usuarioController));
usuarioRoutes.get('/', usuarioController.listUsuario.bind(usuarioController));
usuarioRoutes.get('/:id', usuarioController.getUsuario.bind(usuarioController));
usuarioRoutes.patch('/:id', usuarioController.patchUsuario.bind(usuarioController));
usuarioRoutes.put('/:id', usuarioController.putUsuario.bind(usuarioController));
usuarioRoutes.delete('/:id', usuarioController.deleteUsuario.bind(usuarioController));
