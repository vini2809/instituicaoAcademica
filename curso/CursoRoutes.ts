import express from 'express'

import {CursoController} from './CursoController.ts'
import { CursoRepository } from './CursoRepository.ts';
import { CursoService } from './CursoService.ts';
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts';
import { EspacoFisicoRepository } from '../espaco_fisico/EspacoFisicoRepository.ts';

const cursoRepository = new CursoRepository;
const cursoService = new CursoService(cursoRepository, new InstituicaoRepository(), new EspacoFisicoRepository())
const cursoController = new CursoController(cursoService);

export const cursoRoutes = express.Router();

cursoRoutes.post('/', cursoController.postCurso.bind(cursoController));
cursoRoutes.get('/', cursoController.listCurso.bind(cursoController));
cursoRoutes.get('/:id', cursoController.getCurso.bind(cursoController));
cursoRoutes.patch('/:id', cursoController.patchCurso.bind(cursoController));
cursoRoutes.put('/:id', cursoController.putCurso.bind(cursoController));
cursoRoutes.delete('/:id', cursoController.deleteCurso.bind(cursoController));
