import express from 'express'

import {InstituicaoController} from './InstituicaoController.ts'
import { InstituicaoRepository } from './InstituicaoRepository.ts';
import { InstituicaoService } from './InstituicaoService.ts';

const instituicaoRepository = new InstituicaoRepository;
const instituicaoService = new InstituicaoService(instituicaoRepository)
const instituicaoController = new InstituicaoController(instituicaoService);

export const instituicaoRoutes = express.Router();

instituicaoRoutes.post('/', instituicaoController.postInstituicao.bind(instituicaoController));
instituicaoRoutes.get('/', instituicaoController.listInstituicao.bind(instituicaoController));
instituicaoRoutes.get('/:id', instituicaoController.getInstituicao.bind(instituicaoController));
instituicaoRoutes.patch('/:id', instituicaoController.patchInstituicao.bind(instituicaoController));
instituicaoRoutes.put('/:id', instituicaoController.putInstituicao.bind(instituicaoController));
instituicaoRoutes.delete('/:id', instituicaoController.deleteInstituicao.bind(instituicaoController));
