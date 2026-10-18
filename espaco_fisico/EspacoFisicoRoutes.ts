import express from 'express'

import {EspacoFisicoController} from './EspacoFisicoController.ts'
import { EspacoFisicoRepository } from './EspacoFisicoRepository.ts';
import { EspacoFisicoService } from './EspacoFisicoService.ts';
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts';

const espacoFisicoRepository = new EspacoFisicoRepository;
const espacoFisicoService = new EspacoFisicoService(espacoFisicoRepository, new InstituicaoRepository())
const espacoFisicoController = new EspacoFisicoController(espacoFisicoService);

export const espacoFisicoRoutes = express.Router();

espacoFisicoRoutes.post('/', espacoFisicoController.postEspacoFisico.bind(espacoFisicoController));
espacoFisicoRoutes.get('/', espacoFisicoController.listEspacoFisico.bind(espacoFisicoController));
espacoFisicoRoutes.get('/:id', espacoFisicoController.getEspacoFisico.bind(espacoFisicoController));
espacoFisicoRoutes.patch('/:id', espacoFisicoController.patchEspacoFisico.bind(espacoFisicoController));
espacoFisicoRoutes.put('/:id', espacoFisicoController.putEspacoFisico.bind(espacoFisicoController));
espacoFisicoRoutes.delete('/:id', espacoFisicoController.deleteEspacoFisico.bind(espacoFisicoController));
